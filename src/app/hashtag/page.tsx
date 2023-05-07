import { getMetadata } from "@src/shared/metadata";

// component
import HashtagPosts from "./HashtagPosts";

// util
import { combinePhotoURL } from "@src/utils";

// type
import type { Metadata } from "next";
import { apiServiceSSR } from "@src/apis";
import Title from "@src/components/common/Title";
interface Props {
  searchParams: { hashtag: string };
}

/** 2023/05/05 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  searchParams: { hashtag },
}: Props): Promise<Metadata> => {
  const data = await apiServiceSSR.fetchHashtagPosts({
    hashtag,
    take: 10,
    skip: 0,
  });

  return getMetadata({
    title: "#" + hashtag,
    description:
      data?.posts?.[0]?.content || `#${hashtag}를 갖는 게시글이 없습니다.`,
    images: data.posts?.[0].photos[0]
      ? [combinePhotoURL(data.posts[0].photos[0])]
      : undefined,
  });
};

/** 2023/05/05 - 해시태그 페이지 - by 1-blue */
const HashtagPage = async ({ searchParams: { hashtag } }: Props) => {
  const initialData = await apiServiceSSR.fetchHashtagPosts({
    hashtag,
    take: 10,
    skip: 0,
  });

  return (
    <>
      <Title
        title={`** 검색된 게시글 ${initialData.posts.length}개 ( #${hashtag} ) **`}
      />

      <HashtagPosts hashtag={hashtag} initialData={initialData} />
    </>
  );
};

export default HashtagPage;
