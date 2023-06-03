import { useCallback, useEffect, useState } from "react";

// util
import { dateOrTimeFormat } from "@src/utils";

// hook
import useResizeTextarea from "@src/hooks/useResizeTextarea";
import { useMe } from "@src/hooks/query";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostComment from "./style";

// type
import type { CommentsWithData } from "@src/types/api";

interface Props {
  userIdx: number;
  comment: CommentsWithData;
  onUpdateComment: (idx: number, content: string) => void;
}

/** 2023/04/22 - 게시글의 댓글 컴포넌트 - by 1-blue */
const PostComment: React.FC<Props> = ({
  userIdx,
  comment,
  onUpdateComment,
}) => {
  const { me } = useMe.useFetchMe({});

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
    (commentIdx: number) => {
      if (!disabled) onUpdateComment(commentIdx, content);
      else setTimeout(() => commentRef.current?.focus(), 0);

      setDisabled((prev) => !prev);
      setTimeout(() => handleResizeHeight(), 0);
    },
    [onUpdateComment, content, disabled, commentRef, handleResizeHeight]
  );

  /** 2023/04/25 - 로그인한 유저가 좋아요 눌렀는지 여부 - by 1-blue */
  const isLiked = !!comment.commentLikers.length;

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
          {userIdx === me?.idx && (
            <>
              <button
                type="button"
                onClick={() => onClickUpdateButton(comment.idx)}
              >
                {disabled ? "수정" : "수정 완료"}
              </button>
              {disabled ? (
                <button
                  type="button"
                  data-type="delete"
                  data-comment-idx={comment.idx}
                >
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
            </>
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
        <button
          type="button"
          data-type="like"
          data-is-liked={isLiked}
          data-comment-idx={comment.idx}
        >
          <Icon shape="heart" size="sm" fill={isLiked} color="#ef4444" />
        </button>
        {!!comment._count.commentLikers && (
          <button
            type="button"
            data-type="modal"
            data-comment-idx={comment.idx}
          >
            {comment._count.commentLikers}
          </button>
        )}
      </section>
    </StyledPostComment>
  );
};

export default PostComment;
