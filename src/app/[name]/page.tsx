"use client";

interface Props {
  params: { name: string };
  searchParams: {};
}

/** 2023/03/27 - 프로필 페이지 - by 1-blue */
const ProfilePage: React.FC<Props> = ({ params: { name } }) => {
  return (
    <>
      <h1>{name} - 프로필</h1>
    </>
  );
};

export default ProfilePage;
