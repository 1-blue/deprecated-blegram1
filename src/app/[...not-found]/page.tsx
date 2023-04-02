import { notFound } from "next/navigation";

/** 2023/04/03 - 존재하지 않는 경로 처리 ( [참고](https://stackoverflow.com/questions/75302340/not-found-page-does-not-work-in-next-js-13) ) - by 1-blue */
const NotFoundCatchAll = () => notFound();

export default NotFoundCatchAll;
