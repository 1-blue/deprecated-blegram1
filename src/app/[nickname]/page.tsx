// component
import Profile from "./Profile";
import ProfileNav from "./ProfileNav";
import WrittenPosts from "./Posts/WrittenPosts";
import BookmarkedPosts from "./Posts/BookmarkedPosts";
import LikedPosts from "./Posts/LikedPosts";

// ssr
import { apiServiceSSR } from "@src/apis";
import { getMetadata } from "@src/shared/metadata";
import { combinePhotoURL } from "@src/utils";
import type { Metadata } from "next";

// type
import type { ProfilePageType } from "@src/types";
interface Props {
  params: { nickname: string };
  searchParams: { type: ProfilePageType };
}

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  params: { nickname },
}: Props): Promise<Metadata> => {
  // "favicon.ico", "android-chrome-192x192.png" 같은 요청이 들어와서 제외
  if (nickname.includes(".")) return {};

  const data = await apiServiceSSR.fetchUser({ nickname });

  if (!data.user) {
    return getMetadata({
      title: nickname,
      description: "존재하지 않는 유저입니다.",
      images: undefined,
      url: `/${nickname}`,
    });
  }

  return getMetadata({
    title: nickname,
    description: `${data.user.nickname}\n${data.user.introduction}`,
    images: data.user?.avatar ? [combinePhotoURL(data.user.avatar)] : undefined,
    url: `/${nickname}`,
  });
};

/** 2023/03/27 - 프로필 페이지 - by 1-blue */
const ProfilePage = async ({
  params: { nickname },
  searchParams: { type = "written" },
}: Props) => {
  // "favicon.ico", "android-chrome-192x192.png" 같은 요청이 들어와서 제외
  if (nickname.includes(".")) return;

  const initialData = await apiServiceSSR.fetchUser({ nickname });

  return (
    <>
      <Profile nickname={nickname} initialData={initialData} />

      <ProfileNav nickname={nickname} type={type} />

      {/* FIXME: 게시글 없음 표시 */}

      {type === "written" && <WrittenPosts nickname={nickname} />}
      {type === "bookmarked" && <BookmarkedPosts nickname={nickname} />}
      {type === "liked" && <LikedPosts nickname={nickname} />}
    </>
  );
};

export default ProfilePage;
