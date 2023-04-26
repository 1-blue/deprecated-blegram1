// hook
import useLikerModal from "@src/hooks/recoil/useLikerModal";

// style
import StyledPostLikers from "./style";

// type
interface Props {
  postIdx: number;
  likerCount: number;
}

/** 2023/04/25 - 게시글에 좋아요 누른 사람들 - by 1-blue */
const PostLikers: React.FC<Props> = ({ postIdx, likerCount }) => {
  const { openLikerModal } = useLikerModal();

  return (
    <StyledPostLikers onClick={() => openLikerModal(postIdx)}>
      좋아요 {likerCount.toLocaleString()}개
    </StyledPostLikers>
  );
};

export default PostLikers;
