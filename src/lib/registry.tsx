/**
 * https://beta.nextjs.org/docs/styling/css-in-js#styled-components
 *
 * "next.js" 13에서 "styled-components"을 적용하기 위함
 **/
"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/** 2023/03/23 - ["next.js + styled-components"](https://beta.nextjs.org/docs/styling/css-in-js#styled-components)를 위한 컴포넌트 - by 1-blue */
const StyledComponentsRegistry: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};

export default StyledComponentsRegistry;
