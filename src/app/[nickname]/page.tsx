// component
import Profile from "@src/components/pages/Profile";

// ssr
import { defaultMatadata } from "@src/shared/metadata";
import { combinePhotoURL } from "@src/utils";
import type { ApiFetchUserResponse } from "@src/types/api";
import type { Metadata } from "next";
interface Props {
  params: { nickname: string };
}

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  params: { nickname },
}: Props): Promise<Metadata> => {
  // "favicon.ico", "android-chrome-192x192.png" 같은 요청이 들어와서 제외
  if (nickname.includes(".")) {
    return {
      ...defaultMatadata,
      title: `blegram | ${nickname}`,

      openGraph: {
        ...defaultMatadata.openGraph,
        title: `blegram | ${nickname}`,
      },

      twitter: {
        ...defaultMatadata.twitter,
        title: `blegram | ${nickname}`,
      },
    };
  }

  const data = (await fetch(
    process.env.BASE_URL + `/api/user?nickname=${nickname}`,
    { cache: "default" }
  ).then((res) => res.json())) as ApiFetchUserResponse;

  return {
    ...defaultMatadata,
    title: `blegram | ${nickname}`,
    description: data.user
      ? `${data.user.nickname}\n${data.user.introduction}`
      : "존재하지 않는 유저입니다.",

    openGraph: {
      ...defaultMatadata.openGraph,
      title: `blegram | ${nickname}`,
      description: data.user
        ? `${data.user.nickname}\n${data.user.introduction}`
        : "존재하지 않는 유저입니다.",
      ...(data.user?.avatar && {
        images: [combinePhotoURL(data.user.avatar)],
      }),
    },

    twitter: {
      ...defaultMatadata.twitter,
      title: `blegram | ${nickname}`,
      description: data.user
        ? `${data.user.nickname}\n${data.user.introduction}`
        : "존재하지 않는 유저입니다.",
      ...(data.user?.avatar && {
        images: [combinePhotoURL(data.user.avatar)],
      }),
    },
  };
};

/** 2023/03/27 - 프로필 페이지 - by 1-blue */
const ProfilePage = async ({ params: { nickname } }: Props) => {
  // "favicon.ico", "android-chrome-192x192.png" 같은 요청이 들어와서 제외
  if (nickname.includes(".")) return <Profile nickname={nickname} />;

  const data = (await fetch(
    process.env.BASE_URL + `/api/user?nickname=${nickname}`,
    { cache: "default" }
  ).then((res) => res.json())) as ApiFetchUserResponse;

  return <Profile nickname={nickname} initialData={data} />;
};

export default ProfilePage;
