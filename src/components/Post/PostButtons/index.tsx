import { useCallback } from "react";

// hook
import { useBookmark, useLike } from "@src/hooks/query";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledPostButtons from "./style";

// type
interface Props {
  postIdx: number;
  isPostLiked: boolean;
  isBookmarked: boolean;
  isCommentFocus: boolean;
  commentTextareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}

/** 2023/04/09 - 게시글 하단 버튼들 ( 좋아요, 댓글, 북마크 ) - by 1-blue */
const PostButtons: React.FC<Props> = ({
  postIdx,
  isPostLiked,
  isBookmarked,
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
    if (isPostLiked) mutateDeleteLikeOfPost({ postIdx });
    // 좋아요를 누르지 않은 경우 ( 좋아요 추가 )
    else mutateUploadLikeOfPost({ postIdx });
  }, [isPostLiked, postIdx, mutateUploadLikeOfPost, mutateDeleteLikeOfPost]);

  /** 2023/05/02 - 게시글 북마크 추가 뮤테이트 훅 - by 1-blue */
  const mutateUploadBookmark = useBookmark.useUploadBookmark();

  /** 2023/05/02 - 게시글 북마크 제거 뮤테이트 훅 - by 1-blue */
  const mutateDeleteBookmark = useBookmark.useDeleteBookmark();

  /** 2023/05/02 - 게시글에 북마크 추가/제거 - by 1-blue */
  const onClickBookmark = useCallback(() => {
    // 이미 북마크를 누른 경우 ( 북마크 제거 )
    if (isBookmarked) mutateDeleteBookmark({ postIdx });
    // 북마크를 누르지 않은 경우 ( 북마크 추가 )
    else mutateUploadBookmark({ postIdx });
  }, [isBookmarked, postIdx, mutateUploadBookmark, mutateDeleteBookmark]);

  return (
    <StyledPostButtons>
      {/* FIXME: 아이콘 hover 색상,,.,.,.. */}
      <button type="button" onClick={onClickLike}>
        <Icon
          shape="heart"
          fill={isPostLiked}
          color="#ef4444"
          hover="#dc2626"
        />
      </button>
      <button type="button" onClick={() => commentTextareaRef.current?.focus()}>
        <Icon
          shape="chat-bubble-oval-left"
          fill={isCommentFocus}
          color="#14b8a6"
          hover="#0d9488"
        />
      </button>
      <button type="button" onClick={onClickBookmark}>
        <Icon
          shape="bookmark"
          fill={isBookmarked}
          color="#3b82f6"
          hover="#2563eb"
        />
      </button>
    </StyledPostButtons>
  );
};

export default PostButtons;
