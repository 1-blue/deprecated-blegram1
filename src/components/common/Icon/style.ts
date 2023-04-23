import styled, { css } from "styled-components";

// type
import type { Props } from ".";
type StyledProps = Pick<Props, "size" | "hover" | "reverse">;

/** 2023/03/23 - 아이콘 스타일 컴포넌트 - by 1-blue */
const StyledIcon = styled.svg<StyledProps>`
  color: ${({ theme, color, reverse }) =>
    color || theme.colors[reverse ? "bg" : "fg"]};

  transition: all 0.2s;

  /** 크기 */
  ${({ size }) => {
    switch (size) {
      case "xs":
        return css`
          width: 1em;
          height: 1em;
        `;
      case "sm":
        return css`
          width: 1.4em;
          height: 1.4em;
        `;
      case "md":
        return css`
          width: 1.8em;
          height: 1.8em;
        `;
      case "lg":
        return css`
          width: 2.4em;
          height: 2.4em;
        `;
      case "xl":
        return css`
          width: 2.8em;
          height: 2.8em;
        `;
      case "2xl":
        return css`
          width: 3.2em;
          height: 3.2em;
        `;
    }
  }}

  /** "hover"에 대한 정의가 있다면 */
  ${({ hover }) =>
    hover
      ? css`
          cursor: pointer;

          &:hover {
            color: ${hover};
          }
        `
      : css`
          cursor: auto;
        `}


  /** 버튼/앵커의 하위요소인 경우 */
  button > &,
  a > & {
    pointer-events: none;
    cursor: pointer;
  }

  /** 아이콘 hover ( 버튼/앵커에 감싸져 있다면 버튼/앵커에 hover 시 실행 ) */
  button:hover > &,
  a:hover > & {
    color: ${({ hover }) => hover};
    stroke-width: ${({ strokeWidth }) => strokeWidth && +strokeWidth + 1};
    cursor: pointer;
  }
`;

/** 2023/03/23 - 모든 아이콘 렌더링 컨테이터 컴포넌트 - by 1-blue */
const StyledAllIconContainer = styled.ul`
  display: flex;
  flex-flow: row wrap;

  & li + li {
    margin-left: 1em;
  }
`;

export default StyledIcon;

export { StyledAllIconContainer };
