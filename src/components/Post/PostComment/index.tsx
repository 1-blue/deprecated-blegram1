import { useCallback, useEffect, useState } from "react";

// util
import { dateOrTimeFormat } from "@src/utils";

// hook
import useResizeTextarea from "@src/hooks/useResizeTextarea";
import { useLike } from "@src/hooks/query";
import useCommentLikerModal from "@src/hooks/recoil/useCommentLikerModal";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostComment from "./style";

// type
import type { CommentsWithData } from "@src/types/api";

interface Props {
  postIdx: number;
  comment: CommentsWithData;
  onUpdateComment: (idx: number, content: string) => void;
}

/** 2023/04/22 - 게시글의 댓글 컴포넌트 - by 1-blue */
const PostComment: React.FC<Props> = ({
  postIdx,
  comment,
  onUpdateComment,
}) => {
  /** 2023/04/21 - comment의 content - by 1-blue */
  const [content, setContent] = useState(comment.content);

  /** 2023/04/21 - comment의 content인 textarea height resize - by 1-blue */
  const [commentRef, handleResizeHeight] = useResizeTextarea();

  /** 2023/04/21 - comment의 content인 textarea 높이 초기화 - by 1-blue */
  useEffect(handleResizeHeight, [handleResizeHeight]);

  /** 2023/04/21 - 댓글 수정 여부 - by 1-blue */
  const [disabled, setDisabled] = useState(true);

  /** 2023/04/21 - 댓글 수정 버튼 핸들러 - by 1-blue */
  const onClickUpdateButton = useCallback(
    (idx: number) => {
      if (!disabled) onUpdateComment(idx, content);
      else setTimeout(() => commentRef.current?.focus(), 0);

      setDisabled((prev) => !prev);
    },
    [onUpdateComment, content, disabled, commentRef]
  );

  /** 2023/04/25 - 로그인한 유저가 좋아요 눌렀는지 여부 - by 1-blue */
  const isLiked = !!comment.commentLikers.length;

  /** 2023/04/27 - 댓글 좋아요 추가 뮤테이트 훅 - by 1-blue */
  const mutateUploadLikeOfComment = useLike.useUploadLikeOfComment();

  /** 2023/04/27 - 댓글 좋아요 제거 뮤테이트 훅 - by 1-blue */
  const mutateDeleteLikeOfComment = useLike.useDeleteLikeOfComment();

  /** 2023/04/27 - 댓글에 좋아요 추가/제거 - by 1-blue */
  const onClickLike = useCallback(() => {
    // 이미 좋아요를 누른 경우 ( 좋아요 제거 )
    if (isLiked)
      mutateDeleteLikeOfComment({ postIdx, commentIdx: comment.idx });
    // 좋아요를 누르지 않은 경우 ( 좋아요 추가 )
    else mutateUploadLikeOfComment({ postIdx, commentIdx: comment.idx });
  }, [
    isLiked,
    postIdx,
    comment,
    mutateDeleteLikeOfComment,
    mutateUploadLikeOfComment,
  ]);

  /** 2023/04/28 - 댓글에 좋아요 누른 사람들 모달 열기 - by 1-blue */
  const { openLikerModal } = useCommentLikerModal();

  return (
    <StyledPostComment>
      {/* 좌측 아바타 */}
      <Avatar
        src={comment.user.avatar}
        alt={`${comment.user.nickname}님의 아바타 이미지`}
        href={
          `/${comment.user.nickname}` as __next_route_internal_types__.RouteImpl<string>
        }
      />
      {/* 중간 내용 */}
      <section className="comment-wrapper">
        <div>
          <span>{comment.user.nickname}</span>
          <time>
            {dateOrTimeFormat(comment.createdAt, "YYYY-MM-DD-hh-mm-ss")}
          </time>
          <button
            type="button"
            onClick={() => onClickUpdateButton(comment.idx)}
          >
            {disabled ? "수정" : "수정 완료"}
          </button>
          {disabled ? (
            <button type="button" data-idx={comment.idx}>
              삭제
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDisabled(true);
                setContent(comment.content);
                setTimeout(() => handleResizeHeight(), 0);
              }}
            >
              수정 취소
            </button>
          )}
        </div>
        <textarea
          ref={commentRef}
          onChange={(e) => {
            setContent(e.target.value);
            handleResizeHeight();
          }}
          value={content}
          disabled={disabled}
        />
      </section>
      {/* 우측 댓글 좋아요 버튼 */}
      <section className="comment-like-wrapper">
        <button type="button" onClick={onClickLike}>
          <Icon shape="heart" size="sm" fill={isLiked} color="#ef4444" />
        </button>
        <button
          type="button"
          onClick={() => openLikerModal(postIdx, comment.idx)}
        >
          {comment._count.commentLikers}
        </button>
      </section>
    </StyledPostComment>
  );
};

export default PostComment;
