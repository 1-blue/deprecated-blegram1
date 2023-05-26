import StyledCard from "./style";

/** 2023/05/26 - 프로필 페이지 게시글 카드 스켈레톤 컴포넌트 - by 1-blue */
const Card = () => {
  return (
    <>
      {Array(12)
        .fill(null)
        .map((v, i) => (
          <StyledCard key={i}>
            <div />
          </StyledCard>
        ))}
    </>
  );
};

export default Card;
