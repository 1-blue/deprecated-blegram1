import { defaultMatadata } from "@src/shared/metadata";

// component
import HashtagPosts from "./HashtagPosts";

// util
import { combinePhotoURL } from "@src/utils";

// type
import type { Metadata } from "next";
import type { ApiFetchHashtagPostsResponse } from "@src/types/api";
interface Props {
  searchParams: { hashtag: string };
}

/** 2023/05/05 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  searchParams: { hashtag },
}: Props): Promise<Metadata> => {
  const data = (await fetch(
    process.env.BASE_URL + `/api/search/post/${hashtag}`,
    { next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .catch(console.error)) as ApiFetchHashtagPostsResponse;

  return {
    ...defaultMatadata,
    title: `blegram | #${hashtag}`,
    description:
      data?.posts?.[0]?.content || `#${hashtag}를 갖는 게시글이 없습니다.`,
    openGraph: {
      ...defaultMatadata.openGraph,
      title: `blegram | #${hashtag}`,
      description:
        data?.posts?.[0]?.content || `#${hashtag}를 갖는 게시글이 없습니다.`,
      ...(data?.posts?.[0]?.photos[0] && {
        images: [combinePhotoURL(data.posts[0].photos[0])],
      }),
    },
    twitter: {
      ...defaultMatadata.twitter,
      title: `blegram | #${hashtag}`,
      description:
        data?.posts?.[0]?.content || `#${hashtag}를 갖는 게시글이 없습니다.`,
      ...(data?.posts?.[0]?.photos[0] && {
        images: [combinePhotoURL(data.posts[0].photos[0])],
      }),
    },
  };
};

/** 2023/05/05 - 해시태그 페이지 - by 1-blue */
const HashtagPage = async ({ searchParams: { hashtag } }: Props) => {
  const initialData = (await fetch(
    process.env.BASE_URL + `/api/search/post/${hashtag}`,
    { next: { revalidate: 60 } }
  )
    .then((res) => res.json())
    .catch(console.error)) as ApiFetchHashtagPostsResponse;

  return (
    <>
      <section style={{ maxWidth: "500px", margin: "2vh auto 3vh" }}>
        <h2 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          ** 검색된 게시글 {initialData.posts.length}개 ( #{hashtag} ) **
        </h2>
      </section>

      <HashtagPosts hashtag={hashtag} initialData={initialData} />
    </>
  );
};

export default HashtagPage;
