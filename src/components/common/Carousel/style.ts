import styled from "styled-components";
import Slider from "react-slick";

/** 2023/04/13 - "react-slick"의 "Slider" 타입 - by 1-blue */
const StyledSlider = styled(Slider)`
  height: 100%;

  /** 이미지 높이 결정을 위함 */
  div {
    height: inherit;
  }
  & figure {
    height: inherit;

    position: relative;
  }

  /* dots customizing */
  .custom-dots {
    display: flex;
    text-align: center;
    margin-top: 1em;

    & > li {
      display: inline-block;
      margin: 0 6px;
      padding: 0;

      cursor: pointer;

      & > button {
        display: block;
        height: 8px;
        width: 8px;
        padding: 0;

        border: none;
        color: transparent;
        background: ${({ theme }) =>
          theme.isDark ? theme.colors.gray500 : theme.colors.gray400};
        border-radius: 50%;
        cursor: pointer;
      }

      &.slick-active > button {
        background: ${({ theme }) => theme.colors.fg};
      }
    }
  }
`;

export default StyledSlider;
