// style
import StyledLogo from "./style";

export interface Props {
  width: number;
  height: number;
  color?: string;
  hover?: string;
}

/** 2023/03/15 - SVG 로고 컴포넌트 - by 1-blue */
const Logo: React.FC<Props> = ({ color, hover, ...props }) => (
  <StyledLogo
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    fill="currentColor"
    color={color}
    hover={hover}
    {...props}
  >
    {/* 배경 */}
    {/* <path
        fill="#FFF"
        d="M3,1h34c1.1,0,2,0.9,2,2v34c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V3C1,1.9,1.9,1,3,1z"
      /> */}
    <path d="M3,20.9C3,28,7,34,12.7,37L20,3C10.6,3,3,11,3,20.9z M15.6,7.3L10.5,31c-2.6-2.6-4.1-6.4-4.1-10.2C6.4,14.6,10.2,9.2,15.6,7.3z" />
    <path d="M20,3l7.3,34C33,34,37,28,37,20.9C37,11,29.4,3,20,3z M29.5,31L24.4,7.3c5.4,1.9,9.2,7.2,9.2,13.5C33.6,24.6,32.1,28.4,29.5,31z" />
  </StyledLogo>
);

export default Logo;
