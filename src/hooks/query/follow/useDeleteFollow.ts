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
  ApiFetchFollowersResponse,
  ApiFetchFollowingsResponse,
  ApiFetchHashtagPostsResponse,
  ApiFetchPostLikersResponse,
  ApiFetchPostsResponse,
  ApiFetchUserResponse,
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
    onSuccess(data, { userIdx, postIdx, commentIdx, ...user }, context) {
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
                    followers: [],
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
                      followers: [],
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
                      followers: [],
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

      // 특정 유저의 팔로워들 관계 수정
      if (user.followerIdx) {
        queryClient.setQueryData<
          InfiniteData<ApiFetchFollowersResponse> | undefined
        >(
          [queryKeys.followers, user.followerIdx],
          (prev) =>
            prev && {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                followers: page.followers?.map((follower) => {
                  if (follower.idx !== userIdx) return follower;

                  return {
                    ...follower,
                    followers: [],
                  };
                }),
              })),
            }
        );
      }
      // 특정 유저의 팔로잉들 관계 수정
      if (user.followingIdx) {
        queryClient.setQueryData<
          InfiniteData<ApiFetchFollowingsResponse> | undefined
        >(
          [queryKeys.followings, user.followingIdx],
          (prev) =>
            prev && {
              ...prev,
              pages: prev.pages.map((page) => ({
                ...page,
                followings: page.followings?.map((following) => {
                  if (following.idx !== userIdx) return following;

                  return {
                    ...following,
                    followers: [],
                  };
                }),
              })),
            }
        );
      }
      // 특정 유저의 팔로워/팔로잉 인원 수정
      if (user.nickname) {
        // 팔로워 감소
        if (user.followerIdx) {
          queryClient.setQueryData<ApiFetchUserResponse | undefined>(
            [queryKeys.user, user.nickname],
            (prev) =>
              prev && {
                ...prev,
                user: prev.user && {
                  ...prev.user,
                  _count: {
                    ...prev.user._count,
                    followers: prev.user._count.followers - 1,
                  },
                },
              }
          );
        }
        // 팔로잉 감소
        if (user.followingIdx) {
          queryClient.setQueryData<ApiFetchUserResponse | undefined>(
            [queryKeys.user, user.nickname],
            (prev) =>
              prev && {
                ...prev,
                user: prev.user && {
                  ...prev.user,
                  _count: {
                    ...prev.user._count,
                    followings: prev.user._count.followings - 1,
                  },
                },
              }
          );
        }
      }

      toast.success(data.message);
    },
  });

  return mutate;
};

export default useDeleteFollow;
