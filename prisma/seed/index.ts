// dummy data
import { getDummyUsers } from "./users";
import { getDummyPosts } from "./posts";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const createdUsers = await prisma.user.createMany({
    skipDuplicates: true,
    data: getDummyUsers(),
  });

  console.log("유저들 생성 완료");

  const createdPosts = await prisma.post.createMany({
    skipDuplicates: true,
    data: getDummyPosts(),
  });

  console.log("게시글들 생성 완료");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
