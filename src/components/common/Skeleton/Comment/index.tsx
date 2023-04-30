import StyledComment from "./style";

/** 2023/04/29 - 댓글 스켈레톤 컴포넌트 - by 1-blue */
const Comment = () => {
  return (
    <StyledComment>
      {Array(4)
        .fill(null)
        .map((v, i) => (
          <li key={i}>
            {/* 좌측 아바타 */}
            <div className="avatar" />

            {/* 중간 이름, 버튼, 내용 */}
            <section className="mid-wrapper">
              <section className="top-wrapper">
                <div />
                <div />
                <div />
                <div />
              </section>
              <section className="content-wrapper">
                <div />
                <div />
                <div />
              </section>
            </section>

            {/* 우측 좋아요 */}
            <section className="right-wrapper">
              <div />
              <div />
            </section>
          </li>
        ))}
    </StyledComment>
  );
};

export default Comment;
