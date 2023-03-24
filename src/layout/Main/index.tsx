// style
import MainStyled from "./style";

/** 2023/03/23 - 메인 내용을 감싸는 컴포넌트 - by 1-blue */
const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MainStyled>{children}</MainStyled>
);

export default Main;
