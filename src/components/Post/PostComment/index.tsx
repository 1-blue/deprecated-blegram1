import { useCallback, useEffect, useState } from "react";

// util
import { dateOrTimeFormat } from "@src/utils";

// hook
import useResizeTextarea from "@src/hooks/useResizeTextarea";

// component
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostComment from "./style";

// type
import type { CommentsWithData } from "@src/types/api";
interface Props {
  comment: CommentsWithData;
  onUpdateComment: (idx: number, content: string) => void;
}

/** 2023/04/22 - 게시글의 댓글 컴포넌트 - by 1-blue */
const PostComment: React.FC<Props> = ({ comment, onUpdateComment }) => {
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

      setDisabled((prev) => !prev);
    },
    [onUpdateComment, content, disabled]
  );

  return (
    <StyledPostComment>
      <Avatar
        src={comment.user.avatar}
        alt={`${comment.user.nickname}님의 아바타 이미지`}
      />
      <div>
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
              }}
            >
              취소
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
      </div>
    </StyledPostComment>
  );
};

export default PostComment;
