// hook
import useScrollDirection from "@src/hooks/useScrollDirection";

// component
import ThemeToggleButton from "@src/components/common/ThemeToggleButton";

// style
import ASideStyled from "./style";

/** 2023/03/23 - 사이드를 감싸는 컴포넌트 - by 1-blue */
const ASide = () => {
  /** 2023/06/03 - 마지막 스크롤 방향 - by 1-blue */
  const [isUp, isBottom] = useScrollDirection();

  return (
    <ASideStyled isUp={isUp} isBottom={isBottom}>
      <ThemeToggleButton />
    </ASideStyled>
  );
};
export default ASide;
