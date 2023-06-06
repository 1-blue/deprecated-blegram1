import React, { useCallback, useRef } from "react";
import { toast } from "react-toastify";

// hook
import { useMe, useComment } from "@src/hooks/query";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";

// style
import StyledPostCommentForm from "./style";

interface Props {
  postIdx: number;
  isCommentFocus: boolean;
  commentTextareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  handleCommentTextareaResizeHeight: () => void;
  setIsCommentFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

/** 2023/04/09 - 게시글의 댓글 작성 폼 - by 1-blue ( 2023/04/18 ) */
const PostCommentForm: React.FC<Props> = ({
  postIdx,
  isCommentFocus,
  commentTextareaRef,
  handleCommentTextareaResizeHeight,
  setIsCommentFocus,
}) => {
  /** 2023/04/18 - 로그인한 유저 정보 - by 1-blue */
  const { me } = useMe.useFetchMe({});

  /** 2023/04/18 - 댓글 업로드 훅 - by 1-blue */
  const uploadComment = useComment.useUploadComment();

  /** 2023/04/18 - 댓글 업로드 - by 1-blue */
  const onUploadComment: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (!commentTextareaRef.current) return;

      const content = commentTextareaRef.current.value.trim();

      if (!content) return toast.warning("댓글을 입력해주세요!");
      if (content.length > 500)
        return toast.warning("댓글을 500자 이하로 입력해주세요!");

      uploadComment({ postIdx, content });

      commentTextareaRef.current.value = "";
      handleCommentTextareaResizeHeight();
    },
    [
      uploadComment,
      postIdx,
      commentTextareaRef,
      handleCommentTextareaResizeHeight,
    ]
  );

  /** 2023/06/01 - 댓글 생성 버튼 ref - by 1-blue */
  const submitRef = useRef<HTMLButtonElement>(null);

  /** 2023/06/01 - enter / shift + enter 감지 - by 1-blue */
  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      // shift + enter -> 줄바꿈
      if (e.key === "Enter" && e.shiftKey) return;
      // enter -> 댓글 생성
      if (e.key === "Enter") {
        submitRef.current?.click();

        e.preventDefault();
      }
    }, []);

  return (
    <StyledPostCommentForm onSubmit={onUploadComment}>
      <Avatar
        src={me?.avatar || null}
        alt="로그인한 유저의 아바타 이미지"
        href={
          `/${me?.nickname}` as __next_route_internal_types__.RouteImpl<string>
        }
      />
      <textarea
        placeholder="댓글 작성..."
        ref={commentTextareaRef}
        onChange={handleCommentTextareaResizeHeight}
        rows={1}
        onFocus={() => setIsCommentFocus(true)}
        onBlur={() => setIsCommentFocus(false)}
        onKeyDown={onKeyDown}
      />
      <button type="submit" ref={submitRef}>
        <Icon shape="chat-bubble-oval-left" fill={isCommentFocus} />
      </button>
    </StyledPostCommentForm>
  );
};

export default PostCommentForm;
