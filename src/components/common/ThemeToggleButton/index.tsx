"use client";

import { useContext } from "react";
import { useTheme } from "styled-components";

// context
import { MyThemeContext } from "@src/providers/MyThemeProvider";

// component
import Icon from "@src/components/common/Icon";

// style
import ThemeToggleButtonStyled from "./style";

/** 2023/03/23 - 테마 토글 버튼 컴포넌트 - by 1-blue */
const ThemeToggleButton = () => {
  const theme = useTheme();
  const { isDark, onToggleTheme } = useContext(MyThemeContext);

  return (
    <ThemeToggleButtonStyled type="button" onClick={onToggleTheme}>
      <Icon shape={isDark ? "moon" : "sun"} size="lg" color={theme.colors.bg} />
    </ThemeToggleButtonStyled>
  );
};

export default ThemeToggleButton;
