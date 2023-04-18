import React, { useCallback } from "react";
import { toast } from "react-toastify";

// hook
import useMe from "@src/hooks/query/useMe";
import useResizeTextarea from "@src/hooks/useResizeTextarea";
import useUploadComment from "@src/hooks/query/useUploadComment";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostCommentForm from "./style";

interface Props {
  postIdx: number;
}

/** 2023/04/09 - 게시글의 댓글 작성 폼 - by 1-blue ( 2023/04/18 ) */
const PostCommentForm: React.FC<Props> = ({ postIdx }) => {
  /** 2023/04/18 - 로그인한 유저 정보 - by 1-blue */
  const { me } = useMe();

  /** 2023/04/18 - textarea 리사이즈 - by 1-blue */
  const [textRef, handleResizeHeight] = useResizeTextarea();

  /** 2023/04/18 - 댓글 업로드 훅 - by 1-blue */
  const uploadComment = useUploadComment();

  /** 2023/04/18 - 댓글 업로드 - by 1-blue */
  const onUploadComment: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (!textRef.current) return;

      const content = textRef.current.value.trim();

      if (!content) return toast.warning("댓글을 입력해주세요!");
      if (content.length > 500)
        return toast.warning("댓글을 500자 이하로 입력해주세요!");

      uploadComment({ postIdx, content });

      textRef.current.value = "";
      handleResizeHeight();
    },
    [uploadComment, postIdx, textRef, handleResizeHeight]
  );

  return (
    <StyledPostCommentForm onSubmit={onUploadComment}>
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
