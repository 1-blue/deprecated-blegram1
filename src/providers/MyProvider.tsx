"use client";

import MyThemeProvider from "@src/providers/MyThemeProvider";

/** 2023/03/23 - 각종 Provider 적용한 컴포넌트 - by 1-blue */
const MyProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MyThemeProvider>{children}</MyThemeProvider>;
};

export default MyProvider;
