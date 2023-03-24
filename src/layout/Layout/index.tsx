// component
import Header from "@src/layout/Header";
import Main from "@src/layout/Main";
import Footer from "@src/layout/Footer";
import ASide from "@src/layout/ASide";

/** 2023/03/23 - 레이아웃을 적용하는 컴포넌트 - by 1-blue */
const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <Main>{children}</Main>
    <Footer />
    <ASide />
  </>
);

export default Layout;
