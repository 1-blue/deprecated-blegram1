import { useCallback, useState } from "react";
import { toast } from "react-toastify";

// hooks
import { useComments, useComment, useLike, useMe } from "@src/hooks/query";
import useCommentLikerModal from "@src/hooks/recoil/useCommentLikerModal";

// component
import PostComment from "@src/components/Post/PostComment";
import Skeleton from "@src/components/common/Skeleton";

// style
import StyledPostComments from "./style";

// type
interface Props {
  postIdx: number;
  userIdx: number;
  commentCount: number;
}

/** 2023/04/19 - 한 번에 가져올 댓글 개수 - by 1-blue */
const take = 2;

/** 2023/04/09 - 게시글의 댓글들 - by 1-blue */
const PostComments: React.FC<Props> = ({ postIdx, userIdx, commentCount }) => {
  const { me } = useMe.useFetchMe({});

  /** 2023/04/19 - 댓글들 더 불러오기 - by 1-blue */
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useComments.useFetchComments({
      postIdx,
      take,
    });

  /** 2023/04/19 - 댓글들 접기 - by 1-blue */
  const [isOpen, setIsOpen] = useState(true);

  /** 2023/04/21 - 댓글 수정 훅 - by 1-blue */
  const updateCommentMutate = useComment.useUpdateComment(postIdx);

  /** 2023/04/21 - 댓글 수정 및 삭제 ( 버블링 ) - by 1-blue */
  const onUpdateComment = useCallback(
    (commentIdx: number, content: string) =>
      updateCommentMutate({ commentIdx, content }),
    [updateCommentMutate]
  );

  /** 2023/04/21 - 댓글 삭제 훅 - by 1-blue */
  const deleteCommentMutate = useComment.useDeleteComment(postIdx);

  /** 2023/04/27 - 댓글 좋아요 추가 뮤테이트 훅 - by 1-blue */
  const mutateUploadLikeOfComment = useLike.useUploadLikeOfComment();
  /** 2023/04/27 - 댓글 좋아요 제거 뮤테이트 훅 - by 1-blue */
  const mutateDeleteLikeOfComment = useLike.useDeleteLikeOfComment();

  /** 2023/04/28 - 댓글에 좋아요 누른 사람들 모달 열기 - by 1-blue */
  const { openLikerModal } = useCommentLikerModal();

  /** 2023/04/21 - 댓글 수정 및 삭제 ( 버블링 ) - by 1-blue */
  const onClickBubblingHandler: React.MouseEventHandler<HTMLUListElement> =
    useCallback(
      (e) => {
        if (!(e.target instanceof HTMLButtonElement)) return;
        if (!e.target.dataset.type) return;

        // "delete" || "like"
        const { type } = e.target.dataset;

        // 댓글 삭제
        if (type === "delete") {
          if (!e.target.dataset.commentIdx) return;
          if (!me) {
            return toast.warning("로그인을 해야 접근 가능한 기능입니다!");
          }

          // 댓글 삭제를 위해 필요한 데이터들
          const commentIdx = +e.target.dataset.commentIdx;

          deleteCommentMutate({ commentIdx });
        }

        // 좋아요/싫어요 처리
        if (type === "like") {
          if (!e.target.dataset.isLiked) return;
          if (!e.target.dataset.commentIdx) return;
          if (!me) {
            return toast.warning("로그인을 해야 접근 가능한 기능입니다!");
          }

          // 댓글에 좋아요/싫어요를 위해 필요한 데이터들
          const isLiked = JSON.parse(e.target.dataset.isLiked);
          const commentIdx = +e.target.dataset.commentIdx;

          // 이미 좋아요를 누른 경우 ( 좋아요 제거 )
          if (isLiked) mutateDeleteLikeOfComment({ postIdx, commentIdx });
          // 좋아요를 누르지 않은 경우 ( 좋아요 추가 )
          else mutateUploadLikeOfComment({ postIdx, commentIdx });
        }

        // 댓글에 좋아요 누른 사람들 모달 처리
        if (type === "modal") {
          if (!e.target.dataset.commentIdx) return;

          // 댓글 모달을 위해 필요한 데이터
          const commentIdx = +e.target.dataset.commentIdx;

          openLikerModal(postIdx, commentIdx);
        }
      },
      [
        me,
        postIdx,
        mutateDeleteLikeOfComment,
        mutateUploadLikeOfComment,
        deleteCommentMutate,
        openLikerModal,
      ]
    );

  /** 2023/04/19 - 남은 댓글들의 개수 ( 더 불러올 수 있는 댓글들 개수 ) - by 1-blue */
  const count = commentCount - (data?.pages.length || 0) * take;

  return (
    <StyledPostComments>
      <section>
        {/* 댓글 접기 */}
        {!!data?.pages?.[0]?.comments?.length && (
          <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
            댓글 {isOpen ? "접기" : "열기"}
          </button>
        )}
        {/* 댓글 더 불러오기 */}
        {isOpen && !isFetching && hasNextPage && count > 0 && (
          <button type="button" onClick={() => fetchNextPage()}>
            {count}댓글 더 불러오기...
          </button>
        )}
      </section>

      {isOpen && (
        <ul onClick={onClickBubblingHandler}>
          {data?.pages?.map((page) =>
            page.comments?.map((comment) => (
              <PostComment
                key={comment.idx}
                userIdx={userIdx}
                comment={comment}
                onUpdateComment={onUpdateComment}
              />
            ))
          )}
        </ul>
      )}

      {isOpen && isFetching && <Skeleton.Comment />}
    </StyledPostComments>
  );
};

export default PostComments;
