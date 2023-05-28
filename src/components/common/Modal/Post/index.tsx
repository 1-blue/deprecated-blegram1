import { useCallback } from "react";
import { toast } from "react-toastify";

// hook
import { useBookmark, usePost } from "@src/hooks/query";
import usePostModal from "@src/hooks/recoil/usePostModal";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledModal from "./style";

/** 2023/04/14 - 게시글의 모달 ( 수정, 삭제, 북마크, 링크복사 ) - by 1-blue */
const Post = () => {
  /** 2023/04/11 - 게시글 제거 훅 - by 1-blue */
  const deletePostMutate = usePost.useDeletePost();

  /** 2023/04/11 - 게시글의 모달관련 훅 - by 1-blue */
  const { postModalData, closePostModal } = usePostModal();

  /** 2023/04/11 - copy clipboard - by 1-blue */
  const copyLink = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.origin + `?postIdx=${postModalData.postIdx}`)
      .then(() => toast.success("게시글 링크를 복사했습니다."));
  }, [postModalData]);

  /** 2023/05/11 - 게시글 북마크 추가 뮤테이트 훅 - by 1-blue */
  const mutateUploadBookmark = useBookmark.useUploadBookmark();
  /** 2023/05/11 - 게시글 북마크 제거 뮤테이트 훅 - by 1-blue */
  const mutateDeleteBookmark = useBookmark.useDeleteBookmark();
  /** 2023/05/11 - 북마크 버튼 핸들러 - by 1-blue */
  const onClickBookmark = useCallback(() => {
    if (!postModalData.postIdx) return;

    // 북마크 제거
    if (postModalData.isBookmarked) {
      mutateDeleteBookmark({ postIdx: postModalData.postIdx });
    }
    // 북마크 추가
    else {
      mutateUploadBookmark({ postIdx: postModalData.postIdx });
    }
  }, [mutateDeleteBookmark, mutateUploadBookmark, postModalData]);

  /** 2023/05/11 - 수정 버튼 핸들러 - by 1-blue */
  const onClickUpdate = useCallback(() => {
    toast.warning("아직 구현되지 않은 기능입니다...😥");
  }, []);

  /** 2023/05/11 - 삭제 버튼 핸들러 - by 1-blue */
  const onClickDelete = useCallback(() => {
    if (!postModalData.postIdx) return;

    deletePostMutate({ idx: postModalData.postIdx });
  }, [postModalData, deletePostMutate]);

  return (
    <StyledModal onClick={closePostModal}>
      <div>
        <button type="button" onClick={onClickBookmark}>
          <Icon shape="bookmark" size="xs" color="#000" hover="#FFF" />
          <span>{postModalData.isBookmarked ? "저장 취소" : "저장"}</span>
        </button>
        <button type="button" onClick={copyLink}>
          <Icon shape="link" size="xs" color="#000" hover="#FFF" />
          <span>링크</span>
        </button>
        {postModalData.isMine && (
          <>
            <button type="button" onClick={onClickUpdate}>
              <Icon shape="pencil" size="xs" color="#000" hover="#FFF" />
              <span>수정</span>
            </button>
            <button type="button" onClick={onClickDelete}>
              <Icon shape="trash" size="xs" color="#000" hover="#FFF" />
              <span>삭제</span>
            </button>
          </>
        )}
      </div>
    </StyledModal>
  );
};

export default Post;
