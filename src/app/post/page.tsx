// component
import Modal from "@src/components/common/Modal";

// ssr
import { apiServiceSSR } from "@src/apis";
import { getMetadata } from "@src/shared/metadata";
import type { Metadata } from "next";
import { combinePhotoURL, splitPhotoURL } from "@src/utils";

// type
interface Props {
  searchParams: { postIdx: string };
}

/** 2023/06/03 - 메타데이터 - by 1-blue */
export const generateMetadata = async ({
  searchParams: { postIdx },
}: Props): Promise<Metadata> => {
  const data = await apiServiceSSR.fetchPost({ postIdx: +postIdx });

  if (!data.post) {
    return getMetadata({
      title: "존재하지 않는 게시글",
      description: "게시글이 존재하지 않습니다.",
      url: `/post?postIdx=${postIdx}`,
    });
  }

  return getMetadata({
    title: data.post.user.nickname + "님의 게시글",
    description: data.post.content,
    images: splitPhotoURL(data.post.photos).map((photo) =>
      combinePhotoURL(photo)
    ),
    url: `/post?postIdx=${postIdx}`,
  });
};

/** 2023/06/03 - 단일 게시글 페이지 - by 1-blue */
const SignUpPage = ({ searchParams: { postIdx } }: Props) => (
  <Modal.SinglePost postIdx={+postIdx} />
);

export default SignUpPage;
