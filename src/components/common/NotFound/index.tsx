import Link from "next/link";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledNotFound from "./style";

// type
interface Props {
  text?: string;
}

/** 2023/04/03 - 404 페이지 - by 1-blue */
const NotFound: React.FC<Props> = ({ text }) => {
  return (
    <StyledNotFound>
      <section className="top">
        <span>4</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 40 40"
          xmlSpace="preserve"
        >
          <path d="M14.8,5.1L8.8,33C5.8,29.9,4,25.5,4,21C4,13.6,8.5,7.3,14.8,5.1 M20,0C9,0,0,9.4,0,21c0,8.4,4.7,15.5,11.4,19L20,0L20,0z" />
          <path d="M25.2,5.1C31.5,7.3,36,13.6,36,21c0,4.5-1.8,8.9-4.8,12L25.2,5.1 M20,0l8.6,40C35.3,36.5,40,29.4,40,21C40,9.4,31,0,20,0L20,0z" />
        </svg>
        <span>4</span>
      </section>
      <section className="mid">
        <h1>
          {text
            ? text
            : "찾을 수 없는 페이지 입니다.\n경로를 확인하고 다시 입력해주세요!"}
        </h1>
      </section>
      <section className="bottom">
        <Icon shape="chevron-double-down" size="2xl" />
        <Link href="/">메인 페이지로 이동</Link>
      </section>
    </StyledNotFound>
  );
};

export default NotFound;
