// util
import { combinePhotoURL } from "@src/utils";

// component
import Carousel from "@src/components/common/Carousel";

// style
import StyledPostPhotos from "./style";

// type
interface Props {
  photos: string[];
}

/** 2023/04/09 - 게시글 이미지들 - by 1-blue */
const PostPhotos: React.FC<Props> = ({ photos }) => {
  return (
    <StyledPostPhotos>
      <Carousel photos={photos.map((photo) => combinePhotoURL(photo))} />
    </StyledPostPhotos>
  );
};

export default PostPhotos;
