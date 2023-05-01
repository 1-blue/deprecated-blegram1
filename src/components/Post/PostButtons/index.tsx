import { useCallback } from "react";

// hook
import { useLike } from "@src/hooks/query";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledPostButtons from "./style";

// type
interface Props {
  postIdx: number;
  isLiked: boolean;
  isCommentFocus: boolean;
  commentTextareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

/** 2023/04/09 - 게시글 하단 버튼들 ( 좋아요, 댓글, 북마크 ) - by 1-blue */
const PostButtons: React.FC<Props> = ({
  postIdx,
  isLiked,
  commentTextareaRef,
  isCommentFocus,
}) => {
  /** 2023/04/24 - 게시글 좋아요 추가 뮤테이트 훅 - by 1-blue */
  const mutateUploadLikeOfPost = useLike.useUploadLikeOfPost();

  /** 2023/04/24 - 게시글 좋아요 제거 뮤테이트 훅 - by 1-blue */
  const mutateDeleteLikeOfPost = useLike.useDeleteLikeOfPost();

  /** 2023/04/24 - 게시글에 좋아요 추가/제거 - by 1-blue */
  const onClickLike = useCallback(() => {
    // 이미 좋아요를 누른 경우 ( 좋아요 제거 )
    if (isLiked) mutateDeleteLikeOfPost({ postIdx });
    // 좋아요를 누르지 않은 경우 ( 좋아요 추가 )
    else mutateUploadLikeOfPost({ postIdx });
  }, [isLiked, postIdx, mutateUploadLikeOfPost, mutateDeleteLikeOfPost]);

  return (
    <StyledPostButtons>
      {/* FIXME: 아이콘 hover 색상,,.,.,.. */}
      <button type="button" onClick={onClickLike}>
        <Icon shape="heart" fill={isLiked} color="#ef4444" hover="#dc2626" />
      </button>
      <button type="button" onClick={() => commentTextareaRef.current?.focus()}>
        <Icon
          shape="chat-bubble-oval-left"
          fill={isCommentFocus}
          color="#14b8a6"
          hover="#0d9488"
        />
      </button>
      <button type="button">
        <Icon shape="bookmark" color="#3b82f6" hover="#2563eb" />
      </button>
    </StyledPostButtons>
  );
};

export default PostButtons;
