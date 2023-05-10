import { useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

// api
import { apiServiceFollow } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { InfiniteData, UseMutateFunction } from "react-query";
import type {
  ApiDeleteFollowRequest,
  ApiDeleteFollowResponse,
  ApiFetchCommentLikersResponse,
  ApiFetchHashtagPostsResponse,
  ApiFetchPostLikersResponse,
  ApiFetchPostsResponse,
} from "@src/types/api";

/** 2023/05/09 - 언팔로우 요청 훅 - by 1-blue */
const useDeleteFollow = (): UseMutateFunction<
  ApiDeleteFollowResponse,
  unknown,
  ApiDeleteFollowRequest,
  unknown
> => {
  const hashtag = useSearchParams()?.get("hashtag");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceFollow.apiDeleteFollow, {
    onSuccess(data, { userIdx, postIdx, commentIdx }, context) {
      // 게시글 작성자와의 관계 수정
      queryClient.setQueryData<InfiniteData<ApiFetchPostsResponse> | undefined>(
        [queryKeys.posts],
        (prev) =>
          prev && {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              posts: page.posts?.map((post) => {
                if (post.userIdx !== userIdx) return post;

                return {
                  ...post,
                  user: {
                    ...post.user,
                    followings: [],
                  },
                };
              }),
            })),
          }
      );

      // 게시글에 좋아요 누른 사람들과의 관계 수정
      if (postIdx) {
        queryClient.setQueryData<
          InfiniteData<ApiFetchPostLikersResponse> | undefined
        >(
          [queryKeys.postLikers, postIdx],
          (prev) =>
            prev && {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                likers: page.likers.map((postLiker) => {
                  if (postLiker.postLikerIdx !== userIdx) return postLiker;

                  return {
                    ...postLiker,
                    postLiker: {
                      ...postLiker.postLiker,
                      followings: [],
                    },
                  };
                }),
              })),
            }
        );
      }

      // 댓글에 좋아요 누른 사람들과의 관계 수정
      if (commentIdx) {
        queryClient.setQueryData<
          InfiniteData<ApiFetchCommentLikersResponse> | undefined
        >(
          [queryKeys.commentLikers, commentIdx],
          (prev) =>
            prev && {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                likers: page.likers.map((liker) => {
                  if (liker.commentLikerIdx !== userIdx) return liker;

                  return {
                    ...liker,
                    commentLiker: {
                      ...liker.commentLiker,
                      followings: [],
                    },
                  };
                }),
              })),
            }
        );
      }

      // 해시태그로 검색된 게시글 작성자와의 관계 수정
      if (hashtag) {
        queryClient.setQueryData<
          InfiniteData<ApiFetchHashtagPostsResponse> | undefined
        >(
          [queryKeys.hashtag, hashtag],
          (prev) =>
            prev && {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                posts: page.posts?.map((post) => {
                  if (post.userIdx !== userIdx) return post;

                  return {
                    ...post,
                    user: {
                      ...post.user,
                      followings: [],
                    },
                  };
                }),
              })),
            }
        );
      }

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useDeleteFollow;
