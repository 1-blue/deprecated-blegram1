"use client";

// style
import StyledTitle from "./style";

// type
interface Props {
  title: string;
}

/** 2023/05/07 - 제목 컴포넌트 - by 1-blue */
const Title: React.FC<Props> = ({ title }) => (
  <StyledTitle>
    <h2>{title}</h2>
  </StyledTitle>
);

export default Title;
