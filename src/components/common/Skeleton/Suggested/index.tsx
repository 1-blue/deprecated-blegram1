// style
import StyledSuggested from "./style";

/** 2023/05/05 - 검색어 자동완성 스켈레톤 UI 컴포넌트 스타일 - by 1-blue */
const Suggested = () => (
  <StyledSuggested>
    {Array(6)
      .fill(null)
      .map((v, i) => (
        <section key={i}>
          <div></div>
          <section>
            <div></div>
            <div></div>
          </section>
        </section>
      ))}
  </StyledSuggested>
);

export default Suggested;
