// type
import StyledPostContents from "./style";

// type
interface Props {
  contents: string;
}

/** 2023/04/09 - 게시글의 내용 - by 1-blue */
const PostContents: React.FC<Props> = ({ contents }) => {
  return <StyledPostContents>{contents}</StyledPostContents>;
};

export default PostContents;
