// component
import Profile from "./Profile";

// ssr
import { apiServiceSSR } from "@src/apis";
import { getMetadata } from "@src/shared/metadata";
import { combinePhotoURL } from "@src/utils";
import type { Metadata } from "next";
interface Props {
  params: { nickname: string };
}

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  params: { nickname },
}: Props): Promise<Metadata> => {
  // "favicon.ico", "android-chrome-192x192.png" 같은 요청이 들어와서 제외
  if (nickname.includes(".")) return {};

  const data = await apiServiceSSR.fetchUser({ nickname });

  return getMetadata({
    title: nickname,
    description: data.user
      ? `${data.user.nickname}\n${data.user.introduction}`
      : "존재하지 않는 유저입니다.",
    images: data.user?.avatar ? [combinePhotoURL(data.user.avatar)] : undefined,
  });
};

/** 2023/03/27 - 프로필 페이지 - by 1-blue */
const ProfilePage = async ({ params: { nickname } }: Props) => {
  // "favicon.ico", "android-chrome-192x192.png" 같은 요청이 들어와서 제외
  if (nickname.includes(".")) return;

  const initialData = await apiServiceSSR.fetchUser({ nickname });

  return <Profile nickname={nickname} initialData={initialData} />;
};

export default ProfilePage;
