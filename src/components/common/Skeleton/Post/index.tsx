import StyledPost from "./style";

/** 2023/04/29 - 게시글 스켈레톤 컴포넌트 - by 1-blue */
const Post = () => {
  return (
    <StyledPost>
      {Array(4)
        .fill(null)
        .map((v, i) => (
          <li key={i}>
            <section className="header-wrapper">
              <div />
              <div />
              <div />
              <div />
            </section>
            <section className="photos-wrapper">
              <div />
            </section>
            <section className="buttons-wrapper">
              <div />
              <div />
              <div />
            </section>
            <section className="content-wrapper">
              <div />
              <div />
              <div />
            </section>
            <section className="comment-wrapper">
              <div />
              <div />
              <div />
            </section>
          </li>
        ))}
    </StyledPost>
  );
};

export default Post;
