import { useState } from "react";

// hooks
import useComments from "@src/hooks/query/useComments";

// style
import StyledPostComments from "./style";
import Avatar from "@src/components/common/Avatar";

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
        {isOpen && hasNextPage && !!count && (
          <button type="button" onClick={() => fetchNextPage()}>
            {count}댓글 더 불러오기...
          </button>
        )}
      </section>

      {isOpen && (
        <ul>
          {data?.pages?.map((page) =>
            page.comments?.map((comment) => (
              <li key={comment.idx}>
                <Avatar
                  src={comment.user.avatar}
                  alt={`${comment.user.nickname}님의 아바타 이미지`}
                />
                <div>
                  <div>
                    <span>{comment.user.nickname}</span>
                    <time>{comment.createdAt}</time>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </StyledPostComments>
  );
};

export default PostComments;
