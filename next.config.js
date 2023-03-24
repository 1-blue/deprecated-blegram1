/** @type {import("next").NextConfig} */
const nextConfig = {
  // // 허용할 페이지 확장자
  // pageExtensions: ["tsx"],

  experimental: {
    // "/app"을 사용하기 위한 설정 ( Next.js 13 )
    appDir: true,

    // "<Link>"에 타입 적용 여부
    typedRoutes: true,

    // 서버의 구성 요소로 사용 ( 유명한 패키지는 자동으로 포함됨 )
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
