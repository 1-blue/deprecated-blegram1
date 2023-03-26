import type { User } from "@prisma/client";

/** "NextApiRequest" 재정의 ( TODO: 정확히는 모르겠으나 "IncomingMessage"를 상속받음 ) */
declare module "http" {
  interface IncomingMessage {
    user?: Omit<User, "password">;
  }
}

// FIXME: 아래처럼 사용하고 싶은데 안 되는 이유를 모르겠음
// interface NextApiRequest {
//   user: Omit<User, "password">;
// }
