// component
import ProfileUpdate from "@src/components/pages/Profile/Update";

// ssr
import { defaultMatadata } from "@src/shared/metadata";
import type { Metadata } from "next";

/** 2023/04/30 - 메타데이터 - by 1-blue */
export const metadata: Metadata = {
  ...defaultMatadata,
  title: "blegram | 정보 수정",
  description: "프로필 정보 수정 페이지입니다.",

  openGraph: {
    ...defaultMatadata.openGraph,
    title: "blegram | 정보수정",
    description: "프로필 정보 수정 페이지입니다.",
  },

  twitter: {
    ...defaultMatadata.twitter,
    title: "blegram | 정보수정",
    description: "프로필 정보 수정 페이지입니다.",
  },
};

// type
interface Props {
  params: { nickname: string };
}

/** 2023/04/30 - 프로필 수정 페이지 컴포넌트 - by 1-blue */
const ProfileUpdatePage: React.FC<Props> = ({ params: { nickname } }) => (
  <ProfileUpdate nickname={nickname} />
);

export default ProfileUpdatePage;
