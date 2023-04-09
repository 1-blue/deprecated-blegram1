import Image from "next/image";
import Slider, { type Settings } from "react-slick";

// hook
import useInnerSize from "@src/hooks/useInnerSize";

// util
import { blurDataURL, combinePhotoURL } from "@src/utils";

// style
import StyledPostPhotos from "./style";

/** 2023/04/08 - react-slick setting - by 1-blue */
const settings: Settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  touchMove: true,
  arrows: false,
  dotsClass: "custom-dots",
};

// type
interface Props {
  photos: string[];
}

/** 2023/04/09 - 게시글 이미지들 - by 1-blue */
const PostPhotos: React.FC<Props> = ({ photos }) => {
  /** 2023/04/09 - 현재 브라우저 width - by 1-blue */
  const [innerWidth] = useInnerSize();

  /** 2023/04/09 - 여러 이미지 입력받는 인풋창 렌더링 크기에 사용 ( react-slick ) - by 1-blue */
  const width = innerWidth >= 500 ? 500 : innerWidth;

  return (
    <StyledPostPhotos>
      <Slider {...settings}>
        {photos.map((photo) => (
          <Image
            key={photo}
            src={combinePhotoURL(photo)}
            alt="이미지"
            width={width}
            height={width}
            quality={75}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        ))}
      </Slider>
    </StyledPostPhotos>
  );
};

export default PostPhotos;
