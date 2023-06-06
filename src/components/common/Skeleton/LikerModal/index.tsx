// style
import StyledLikerModal from "./style";

/** 2023/04/26 - 좋아요 누른 사람들 모달 스켈레톤 UI - by 1-blue */
const LikerModal = () => {
  return (
    <StyledLikerModal>
      {Array(6)
        .fill(null)
        .map((v, i) => (
          <li key={i}>
            <div className="avatar" />
            <section className="name-wrapper">
              <div className="nickname" />
              <div className="name" />
            </section>
            <div className="follow" />
          </li>
        ))}
    </StyledLikerModal>
  );
};

export default LikerModal;
