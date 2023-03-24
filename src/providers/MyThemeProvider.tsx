"use client";

import { createContext, useCallback, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

// style
import theme, { type Theme, darkTheme, lightTheme } from "@src/shared/theme";
import { GlobalStyle } from "@src/shared/style";

/** 2023/03/23 - 테마 토글을 위한 컨텍스트 - by 1-blue */
export const MyThemeContext = createContext({
  isDark: false,
  onToggleTheme: () => {},
});

/** 2023/03/23 - 테마와 관련된 Provider ( using styled-components ) - by 1-blue */
const MyThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  /** 2023/03/23 - 현재 테마 - by 1-blue */
  const [isDark, setIsDark] = useState(true);

  /** 2023/03/23 - 현재 테마에 맞는 색상 지정 - by 1-blue */
  const myTheme: Theme = useMemo(
    () => ({
      ...theme,
      colors: {
        ...theme.colors,
        ...(isDark ? darkTheme : lightTheme),
      },
      isDark,
    }),
    [isDark]
  );

  /** 2023/03/23 - 테마 토글 이벤트 핸들러 - by 1-blue */
  const onToggleTheme = useCallback(() => setIsDark((prev) => !prev), []);

  return (
    <MyThemeContext.Provider value={{ isDark, onToggleTheme }}>
      <ThemeProvider theme={myTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </MyThemeContext.Provider>
  );
};

export default MyThemeProvider;
