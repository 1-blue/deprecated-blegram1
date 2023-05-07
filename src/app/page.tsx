// component
import Post from "@src/components/Post";

// ssr
import { apiServiceSSR } from "@src/apis";
import { getMetadata } from "@src/shared/metadata";
import { combinePhotoURL } from "@src/utils";
import type { Metadata } from "next";
interface Props {
  searchParams: { postIdx: string | undefined };
}

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  searchParams: { postIdx },
}: Props): Promise<Metadata> => {
  const data = await apiServiceSSR.fetchPosts({
    take: 10,
    lastIdx: Number(postIdx) || -1,
  });

  return getMetadata({
    title: "메인",
    description: data?.posts?.[0].content || "게시글이 존재하지 않습니다.",
    images: data.posts?.[0].photos[0]
      ? [combinePhotoURL(data.posts[0].photos[0])]
      : undefined,
  });
};

/** 2023/03/24 - 홈 페이지 - by 1-blue ( 2023/04/09 ) */
const HomePage = async ({ searchParams: { postIdx } }: Props) => {
  // TODO: 쿠키를 실어서 보내야 본인이 좋아요를 누른 게시글인지를 판단한 결괏값을 얻을 수 있는데 쿠키를 넣는 방법을 모르겠음
  // header의 authorization으로 보낼 수 있을 것 같긴하지만,,, 쿠키 사용하다가 여기서만 다르게 처리하고 싶지 않아서 고민중,,,
  const initialData = await apiServiceSSR.fetchPosts({
    take: 10,
    lastIdx: Number(postIdx) || -1,
  });

  return <Post initialData={initialData} />;
};

export default HomePage;
