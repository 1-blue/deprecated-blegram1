import { Prisma } from "@prisma/client";

const candidateUserIdx = Array(5)
  .fill(null)
  .map((v, i) => i + 1);

/** 2023/04/10 - 가짜 게시글들 - by 1-blue */
export const getDummyPosts = (): Prisma.PostCreateManyInput[] =>
  Array(32)
    .fill(null)
    .map((v, i) => ({
      contents:
        "테스트 게시글 " + i + "\n" + "🐳🐍🐊🦖🦈🐢" + "\n" + "😕🫤🙃🫠☹️🙁",
      photos: `${process.env.NODE_ENV}/photos/cat.jpg|${process.env.NODE_ENV}/photos/dog.jpg|${process.env.NODE_ENV}/photos/lion.jpg`,
      createdAt: new Date(),
      userIdx:
        candidateUserIdx[Math.floor(Math.random() * candidateUserIdx.length)],
    }));
