// component
import NavBar from "@src/layout/NavBar";

// router
import { navRouter } from "@src/router";

// style
import HeaderStyled from "./style";

/** 2023/03/23 - 헤더를 감싸는 컴포넌트 - by 1-blue */
const Header = () => (
  <HeaderStyled>
    <NavBar navRouter={navRouter} />
  </HeaderStyled>
);

export default Header;
