import type { Metadata } from "next";

/** 2023/04/30 - 메타 데이터 기본 형태 - by 1-blue */
export const defaultMetadata: Metadata = {
  generator: "Next.js",
  applicationName: "blegram",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  authors: [{ name: "1-blue", url: "https://github.com/1-blue" }],
  creator: "1-blue",
  keywords: [
    "1-blue",
    "TypeScript",
    "Next.js",
    "react-query",
    "prisma",
    "aws-s3",
    "aws-rds, instagram",
    "인스타그램 클론",
    "front-end, 프론트엔드",
    "신입 개발자",
    "개발자",
  ],
  openGraph: {
    title: "blegram",
    description: "인스타그램 클론 사이트입니다. ( by 1-blue )",
    url: "https://blegram.vercel.app/",
    siteName: "blegram",
    images: [
      // TODO: 기본 이미지 만들기 ( 썸네일 )
    ],
    locale: "ko-KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "blegram",
    description: "인스타그램 클론 사이트입니다. ( by 1-blue )",
    creator: "1-blue",
    images: [
      // TODO: 기본 이미지 만들기 ( 썸네일 )
    ],
  },
};

// type
interface GetMetadataHandler {
  ({
    title,
    description,
    images,
  }: {
    title: string;
    description?: string;
    images?: string[];
  }): Metadata;
}

/** 2023/05/07 - 메타데이터 제조기 - by 1-blue */
export const getMetadata: GetMetadataHandler = ({
  title,
  description,
  images,
}) => ({
  ...defaultMetadata,
  title: "blegram | " + title,
  description: "인스타그램 클론 사이트 ( by 1-blue )" + "\n" + description,

  // og
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "blegram | " + title,
    description: "인스타그램 클론 사이트 ( by 1-blue )" + "\n" + description,
    images: images ? images : ["TODO: 기본 이미지"],
  },

  // twitter
  twitter: {
    ...defaultMetadata.twitter,
    title: "blegram | " + title,
    description: "인스타그램 클론 사이트 ( by 1-blue )" + "\n" + description,
    images: images ? images : ["TODO: 기본 이미지"],
  },
});
