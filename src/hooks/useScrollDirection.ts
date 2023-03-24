import { useCallback, useEffect, useState } from "react";

// util
import { throttleHelper } from "@src/utils";

// type
interface UseScrollDirectionHandler {
  (time?: number): [boolean, boolean, number];
}

/**
 * 2023/03/24 - 마지막 스크롤링의 방향을 알아내는 훅 - by 1-blue
 * @returns [스크롤 방향, 스크롤 최하단 여부, 현재 스크롤 위치] 순서로 반환 ( boolean, boolean, number )
 */
const useScrollDirection: UseScrollDirectionHandler = (time = 50) => {
  // 마지막 스크롤 방향
  const [isUp, setIsUp] = useState(false);
  // 현재 스크롤 위치값 저장할 변수
  const [pageY, setPageY] = useState(0);
  // 현재 스크롤이 최하단에 있는지 판단할 변수
  const [isBottom, setIsBottom] = useState(false);

  // 현재 스크롤 방향을 확인할 스크롤 이벤트 함수
  const handleScroll = useCallback(() => {
    /**
     * scrollHeight: 총 컨텐츠 높이
     * clientHeight: 현재 보이는 높이 ( 현재 화면(컨텐츠)의 높이 )
     * scrollY: 현재 스크롤 높이
     *
     * 따라서 "총 컨텐츠 높이 === 현재 보이는 높이 + 현재 스크롤 높이" 라면 최하단까지 스크롤을 내린 것
     */
    const {
      scrollY,
      document: {
        documentElement: { scrollHeight, clientHeight },
      },
    } = window;

    const deltaY = scrollY - pageY;
    const isUp = scrollY !== 0 && deltaY >= 0;
    const isBottom = scrollHeight - scrollY - clientHeight === 0;

    setIsUp(isUp);
    setPageY(scrollY);
    setIsBottom(isBottom);
  }, [pageY, setIsUp, setPageY, setIsBottom]);

  /** 2023/03/24 - 스크롤 이벤트에 스로틀링 적용 - by 1-blue */
  const throttleScroll = throttleHelper(handleScroll, time);

  /** 2023/03/24 - 스크롤 이벤트 등록 - by 1-blue */
  useEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [throttleScroll]);

  return [isUp, isBottom, pageY];
};

export default useScrollDirection;
