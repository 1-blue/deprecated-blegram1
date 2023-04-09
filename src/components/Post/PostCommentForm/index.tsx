import React, { useCallback, useRef } from "react";

// hook
import useMe from "@src/hooks/query/useMe";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostCommentForm from "./style";

/** 2023/04/09 - 게시글의 댓글 작성 폼 - by 1-blue */
const PostCommentForm = () => {
  const { me } = useMe();

  const textRef = useRef<null | HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    if (!textRef || !textRef.current) return;

    textRef.current.style.height = "0px";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <StyledPostCommentForm>
      <Avatar src={me?.avatar || null} alt="로그인한 유저의 아바타 이미지" />
      <textarea
        placeholder="댓글추가"
        ref={textRef}
        onChange={handleResizeHeight}
        rows={1}
      />
      <button type="submit">
        <Icon shape="chat-bubble-oval-left" />
      </button>
    </StyledPostCommentForm>
  );
};

export default PostCommentForm;
