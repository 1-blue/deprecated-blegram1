import { useMutation, useQueryClient } from "react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

// api
import { apiServiceBookmark } from "@src/apis";

// key
import { queryKeys } from "@src/hooks/query";

// type
import type { UseMutateFunction, InfiniteData } from "react-query";
import type {
  ApiFetchPostsResponse,
  ApiUploadBookmarkRequest,
  ApiUploadBookmarkResponse,
} from "@src/types/api";

/** 2023/05/02 - 게시글에 북마크 추가 훅 - by 1-blue */
const useUploadBookmark = (): UseMutateFunction<
  ApiUploadBookmarkResponse,
  unknown,
  ApiUploadBookmarkRequest,
  unknown
> => {
  const hashtag = useSearchParams()?.get("hashtag");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiServiceBookmark.apiUploadBookmark, {
    onSuccess({ message, bookmarkedIdx, bookmarkerIdx }, { postIdx }, context) {
      queryClient.setQueryData<InfiniteData<ApiFetchPostsResponse> | undefined>(
        hashtag ? [queryKeys.hashtag, hashtag] : [queryKeys.posts],
        (prev) =>
          prev && {
            ...prev,
            pages: prev.pages.map((page) => ({
              ...page,
              posts:
                page.posts &&
                page.posts.map((post) => {
                  if (post.idx !== postIdx) return post;

                  return {
                    ...post,
                    bookMarkers: [
                      ...post.bookMarkers,
                      {
                        bookmarkedIdx,
                        bookmarkerIdx: bookmarkerIdx,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    ],
                  };
                }),
            })),
          }
      );

      toast.success(message);
    },
  });

  return mutate;
};

export default useUploadBookmark;
