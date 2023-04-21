import { useCallback, useState } from "react";

// hooks
import useComments from "@src/hooks/query/useComments";
import useDeleteComment from "@src/hooks/query/useDeleteComment";

// component
import PostComment from "@src/components/Post/PostComment";

// style
import StyledPostComments from "./style";

// type
interface Props {
  postIdx: number;
  commentCount: number;
}

/** 2023/04/19 - 한 번에 가져올 댓글 개수 - by 1-blue */
const take = 2;

/** 2023/04/09 - 게시글의 댓글들 - by 1-blue */
const PostComments: React.FC<Props> = ({ postIdx, commentCount }) => {
  /** 2023/04/19 - 댓글들 더 불러오기 - by 1-blue */
  const { data, hasNextPage, fetchNextPage } = useComments({
    postIdx,
    take,
  });

  /** 2023/04/19 - 댓글들 접기 - by 1-blue */
  const [isOpen, setIsOpen] = useState(true);

  /** 2023/04/21 - 댓글 수정 훅 - by 1-blue */

  /** 2023/04/21 - 댓글 삭제 훅 - by 1-blue */
  const deleteCommentMutate = useDeleteComment();

  /** 2023/04/21 - 댓글 수정 및 삭제 ( 버블링 ) - by 1-blue */
  const onUpdateOrDeleteComment: React.MouseEventHandler<HTMLUListElement> =
    useCallback(
      (e) => {
        if (!(e.target instanceof HTMLButtonElement)) return;

        // 댓글 수정
        if (e.target.dataset.type === "update") {
          console.log(e.target.dataset);
        }
        if (e.target.dataset.type === "delete") {
          deleteCommentMutate({ idx: Number(e.target.dataset.idx) });
        }
      },
      [deleteCommentMutate]
    );

  /** 2023/04/19 - 남은 댓글들의 개수 ( 더 불러올 수 있는 댓글들 개수 ) - by 1-blue */
  const count = commentCount - (data?.pages.length || 0) * take;

  return (
    <StyledPostComments>
      <section>
        {/* 댓글 접기 */}
        <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
          댓글 {isOpen ? "접기" : "열기"}
        </button>

        {/* 댓글 더 불러오기 */}
        {isOpen && hasNextPage && count > 0 && (
          <button type="button" onClick={() => fetchNextPage()}>
            {count}댓글 더 불러오기...
          </button>
        )}
      </section>

      {isOpen && (
        <ul onClick={onUpdateOrDeleteComment}>
          {data?.pages?.map((page) =>
            page.comments?.map((comment) => (
              <PostComment key={comment.idx} comment={comment} />
            ))
          )}
        </ul>
      )}
    </StyledPostComments>
  );
};

export default PostComments;
