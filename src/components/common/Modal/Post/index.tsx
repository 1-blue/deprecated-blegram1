import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

// hook
import useDeletePost from "@src/hooks/query/useDeletePost";
import usePostModal from "@src/hooks/recoil/usePostModal";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledModal from "./style";

/** 2023/04/14 - 게시글의 모달 ( 수정, 삭제, 북마크, 링크복사 ) - by 1-blue */
const Post = () => {
  /** 2023/04/11 - 게시글 제거 훅 - by 1-blue */
  const deletePostMutate = useDeletePost();

  /** 2023/04/11 - 게시글의 모달관련 훅 - by 1-blue */
  const { postModalData, closePostModal } = usePostModal();

  /** 2023/04/11 - copy clipboard - by 1-blue */
  const copyLink = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.origin + `?postIdx=${postModalData.postIdx}`)
      .then(() => toast.success("게시글 링크를 복사했습니다."));
  }, [postModalData]);

  return (
    <StyledModal onClick={closePostModal}>
      <div>
        <button type="button">
          <Icon shape="bookmark" size="xs" color="#000" hover="#FFF" />
          <span>저장</span>
        </button>
        <button type="button" onClick={copyLink}>
          <Icon shape="link" size="xs" color="#000" hover="#FFF" />
          <span>링크</span>
        </button>
        {postModalData.isMine && (
          <>
            <button type="button">
              <Icon shape="pencil" size="xs" color="#000" hover="#FFF" />
              <span>수정</span>
            </button>
            <button
              type="button"
              onClick={() =>
                postModalData.postIdx &&
                deletePostMutate({ idx: postModalData.postIdx })
              }
            >
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
