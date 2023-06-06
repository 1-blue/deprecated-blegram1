// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** 2023/03/27 - 로그인 후 접근 가능한 URL - by 1-blue */
const authURLs = ["/dm", "/update", "/upload"];
/** 2023/03/27 - 로그인 후 접근 불가능한 URL - by 1-blue */
const nonAuthURLs = ["/login", "/signup"];

/**
 * 2023/03/27 -특정 페이지에 접근하기전에 수행할 미들웨어 - by 1-blue
 * 현재는 쿠키의 유무로만 로그인된 상태인지 확인 후 접근 제한
 * ( 만약 쿠키가 있는데 유효하지 않은 경우라면 페이지에 들어갔다가 다시 되돌아오도록 구현 )
 * */
export const middleware = (req: NextRequest) => {
  // 리프래쉬 토큰이 없다면
  if (!req.cookies.has("brt")) {
    // 비로그인 시 접근 불가능한 페이지라면 => 로그인 페이지로 리다이렉트
    if (authURLs.some((url) => req.url.includes(url))) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";

      return NextResponse.redirect(url);
    }
  }
  // 리프래쉬 토큰이 있다면
  else {
    // 로그인 시 접근 불가능한 페이지라면 => 메인 페이지로 리다이렉트
    if (nonAuthURLs.some((url) => req.url.includes(url))) {
      const url = req.nextUrl.clone();
      url.pathname = "/";

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

/**
 * 아래 네 가지 경우는 미들웨어를 거치지 않음
 * 1. /api
 * 2. /_next/static
 * 3. /_next/image
 * 4. /favicon.ico
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
