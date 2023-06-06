import { Prisma } from "@prisma/client";

const shuffle = (array: any[]) => {
  const copyArray = [...array];

  for (let index = copyArray.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));

    const temporary = copyArray[index];
    copyArray[index] = copyArray[randomPosition];
    copyArray[randomPosition] = temporary;
  }

  return copyArray;
};

const candidateUserIdx = Array(5)
  .fill(null)
  .map((v, i) => i + 1);

const candidatePhotos = [
  `${process.env.NODE_ENV}/photos/default/cat.jpg`,
  `${process.env.NODE_ENV}/photos/default/dog.jpg`,
  `${process.env.NODE_ENV}/photos/default/lion.jpg`,
  `${process.env.NODE_ENV}/photos/default/tiger.jpg`,
  `${process.env.NODE_ENV}/photos/default/reindeer.jpg`,
  `${process.env.NODE_ENV}/photos/default/squirrel.jpg`,
  `${process.env.NODE_ENV}/photos/default/chick.jpg`,
  `${process.env.NODE_ENV}/photos/default/alligator.jpg`,
  `${process.env.NODE_ENV}/photos/default/jellyfish.jpg`,
  `${process.env.NODE_ENV}/photos/default/parrot.jpg`,
];

const getPhotos = () => {
  const copyPhotos = shuffle(candidatePhotos);

  // 1. 랜덤한 이미지 개수
  const photoCount = Math.floor(Math.random() * candidatePhotos.length);

  // 2. 랜덤하게 이미지 추출
  const randomPhotos: string[] = [];
  for (let index = 0; index <= photoCount; index++) {
    const randomNumber = Math.floor(Math.random() * (photoCount - index));

    randomPhotos.push(...copyPhotos.splice(randomNumber, 1));
  }

  return randomPhotos;
};

/** 2023/04/10 - 가짜 게시글들 - by 1-blue */
export const getDummyPosts = (): Prisma.PostCreateManyInput[] =>
  Array(32)
    .fill(null)
    .map((v, i) => ({
      content:
        "테스트 게시글 " + i + "\n" + "🐳🐍🐊🦖🦈🐢" + "\n" + "😕🫤🙃🫠☹️🙁",
      photos: getPhotos().join("|"),
      createdAt: new Date(Date.now() - i * 10000),
      userIdx:
        candidateUserIdx[Math.floor(Math.random() * candidateUserIdx.length)],
    }));
