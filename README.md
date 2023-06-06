# 📱 blegram
+ ✏️ 개인 프로젝트 - 인스타그램 클론 코딩
+ ⏱️ 프로젝트 기간: `2023/03/24 ~ 2023/06/05`
+ ⛓️ 배포 링크: [프로젝트 결과물](https://blegram.vercel.app)
+ 가짜 계정: `a`/`a`, `b`/`b`, `c`/`c`, `d`/`d`로 로그인 가능

<br />

# 📝 문서
1. [API 명세서](https://1-blue.gitbook.io/api-blegram)
2. [GitHub Projects](https://github.com/users/1-blue/projects/3/views/1)
3. [Blog](https://1-blue.github.io/categories/blegram)
4. [Commit Convention](https://github.com/1-blue/blegram/wiki/%F0%9F%93%9C-Commit-Convention-%F0%9F%93%9C)
5. [Git Branch Strategy](https://github.com/1-blue/blegram/wiki/%F0%9F%94%96-Git-Branch-Strategy-%F0%9F%94%96)

<br />

# 🧑‍💻 구현 기능
1. [로그인](https://1-blue.github.io/posts/blegram-(2)) / [회원가입](https://1-blue.github.io/posts/blegram-(1)) ( 일반 로그인 JWT )
2. 유저 CRUD ( 이미지, 비밀번호 따로 )
3. 게시글 CUD ( + 이미지 업로드 )
4. 북마크 & 좋아요 & 팔로우
5. 해시태그 ( #으로 시작하는 글자 )
6. 검색 & 추천 검색어 & 최근 검색어
7. [AWS-S3의 prisignedURL을 이용한 이미지 처리](https://1-blue.github.io/posts/blegram-(4))
8. AWS-RDS와 prisma를 이용한 서버측 데이터 처리
9. [react-query를 이용한 클라이언트측 데이터 관리](https://1-blue.github.io/posts/react-query)

<br />

# 🎩 Tech Stack

## 🛠️ Tools
| Git | Github | GitBook | SourceTree |
| :---: | :---: | :---: | :---: |
| <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/git/F05032" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/github/181717" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/gitbook/3884FF" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/sourcetree/0052CC" alt="icon" width="75" height="75" /></div> |

<br />

## 📥 FrontEnd

| TypeScript | Next.js | React-Query | styled-components | recoil | vercel |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/typescript/3178C6" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/reactquery/FF4154" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/styledcomponents/DB7093" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://seeklogo.com/images/R/recoil-icon-logo-9ED29C2C7B-seeklogo.com.png" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/vercel/000000" alt="icon" width="75" height="75" /></div> |

<br />

## 📥 BackEnd

| jwt | prisma | mysql | rds | s3 |
| :---: | :---: | :---: | :---: | :---: |
| <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/jsonwebtokens/000000" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/prisma/2D3748" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/mysql/4479A1" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/amazonrds/527FFF" alt="icon" width="75" height="75" /></div> | <div style="display: flex; align-items: flex-start;"><img src="https://cdn.simpleicons.org/amazons3/569A31" alt="icon" width="75" height="75" /></div> |

# 💡 가이드 라인

## 0️⃣ 환경 변수 등록

```
# prisma seed에서 사용
# NODE_ENV=development
NODE_ENV=production

# ...
BASE_URL=http://127.0.0.1:3000

# rds
DATABASE_URL="mysql://<유저명>:<비밀번호>@blegram.chu2aece13mr.ap-northeast-2.rds.amazonaws.com:3306/<DB명>"

# localhost
# DATABASE_URL="mysql://root:<비밀번호>@localhost:3306/blegram"

# access, refresh 토큰을 만드는 데 사용하는 값
ACCESS_SECRET=
REFRESH_SECRET=

# AWS-S3를 이용하기 위한 key
AWS_S3_BUCKET=blegram
AWS_S3_REGION=ap-northeast-2
AWS_S3_ACCESS_KEY=
AWS_S3_ACCESS_SECRET_KEY=
```

## 1️⃣ 종속성 설치

```bash
npm install
```

## 2️⃣ 개발 모드 실행

```bash
npm run dev
```

## 3️⃣ 배포 모드 빌드 및 실행

```bash
rm -rf .next && npm run build && npm start
```

## 4️⃣ prisma seed

```bash
npx prisma db push
npx prisma db seed
```
