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
  ApiFetchFollowersResponse,
  ApiFetchFollowingsResponse,
  ApiFetchHashtagPostsResponse,
  ApiFetchPostLikersResponse,
  ApiFetchPostsResponse,
  ApiFetchUserResponse,
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
      { userIdx, postIdx, commentIdx, ...user },
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
                    followers: [{ followerIdx, followingIdx }],
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
                      followers: [{ followerIdx, followingIdx }],
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
                      followers: [{ followerIdx, followingIdx }],
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
                    followers: [{ followerIdx, followingIdx }],
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
                    followers: [{ followerIdx, followingIdx }],
                  };
                }),
              })),
            }
        );
      }
      // 특정 유저의 팔로워/팔로잉 인원 수정
      if (user.nickname) {
        // 팔로워 증가
        if (user.followerIdx) {
          queryClient.setQueryData<ApiFetchUserResponse | undefined>(
            [queryKeys.user, user.nickname],
            (prev) =>
              prev && {
                ...prev,
                user: prev.user && {
                  ...prev.user,
                  // 팔로잉/팔로워 개수
                  _count: {
                    ...prev.user._count,
                    followers: prev.user._count.followers + 1,
                  },
                  // 팔로우/언팔로우 버튼
                  followers: [
                    {
                      followerIdx: prev.user.idx,
                      followingIdx: user.followingIdx || -1,
                    },
                  ],
                },
              }
          );
        }
        // 팔로잉 증가
        if (user.followingIdx) {
          queryClient.setQueryData<ApiFetchUserResponse | undefined>(
            [queryKeys.user, user.nickname],
            (prev) =>
              prev && {
                ...prev,
                user: prev.user && {
                  ...prev.user,
                  // 팔로잉/팔로워 개수
                  _count: {
                    ...prev.user._count,
                    followings: prev.user._count.followings + 1,
                  },
                  // 팔로우/언팔로우 버튼
                  followers: [
                    {
                      followerIdx: prev.user.idx,
                      followingIdx: user.followingIdx || -1,
                    },
                  ],
                },
              }
          );
        }
      }

      toast.success(message);
    },
  });

  return mutate;
};

export default useCreateFollow;
