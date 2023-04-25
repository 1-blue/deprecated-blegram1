// style
import StyledPostLikers from "./style";

// type
interface Props {
  likerCount: number;
}

/** 2023/04/25 - 게시글에 좋아요 누른 사람들 - by 1-blue */
const PostLikers: React.FC<Props> = ({ likerCount }) => {
  return (
    <StyledPostLikers>좋아요 {likerCount.toLocaleString()}개</StyledPostLikers>
  );
};

export default PostLikers;
