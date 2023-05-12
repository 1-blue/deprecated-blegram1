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
  ApiCreateFollowRequest,
  ApiCreateFollowResponse,
  ApiFetchCommentLikersResponse,
  ApiFetchHashtagPostsResponse,
  ApiFetchPostLikersResponse,
  ApiFetchPostsResponse,
} from "@src/types/api";

/** 2023/05/09 - 팔로우 요청 훅 - by 1-blue */
const useCreateFollow = (): UseMutateFunction<
  ApiCreateFollowResponse,
  unknown,
  ApiCreateFollowRequest,
  unknown
> => {
  const hashtag = useSearchParams()?.get("hashtag");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceFollow.apiCreateFollow, {
    onSuccess(
      { followerIdx, followingIdx, message },
      { userIdx, postIdx, commentIdx },
      context
    ) {
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
                    followings: [{ followerIdx, followingIdx }],
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
                likers: page.likers.map((liker) => {
                  if (liker.postLikerIdx !== userIdx) return liker;

                  return {
                    ...liker,
                    postLiker: {
                      ...liker.postLiker,
                      followings: [{ followerIdx, followingIdx }],
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
                      followings: [{ followerIdx, followingIdx }],
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
                      followings: [{ followerIdx, followingIdx }],
                    },
                  };
                }),
              })),
            }
        );
      }

      toast.success(message);
    },
  });

  return mutate;
};

export default useCreateFollow;
