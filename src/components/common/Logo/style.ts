import styled, { css } from "styled-components";

// type
import type { Props } from ".";
type StyledProps = Pick<Props, "hover">;

/** 2023/03/15 - SVG 로고 컴포넌트 스타일 - by 1-blue */
const StyledLogo = styled.svg<StyledProps>`
  transition: all 0.2s;

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
`;

export default StyledLogo;
