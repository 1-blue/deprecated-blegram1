import { useEffect, useState } from "react";

// util
import { throttleHelper } from "@src/utils";

/**
 * 2023/04/08 - 현재 브라우저 width, hieght 구하는 훅 - by 1-blue
 * @returns [innerWidth, innerHeight]
 */
const useInnerSize = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };

    const throttleResize = throttleHelper(handleResize, 100);
    throttleResize();

    window.addEventListener("resize", throttleResize);
    return () => window.removeEventListener("resize", throttleResize);
  }, []);

  return [innerWidth, innerHeight] as const;
};

export default useInnerSize;
