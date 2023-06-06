import Image from "next/image";

// util
import { blurDataURL } from "@src/utils";

// style
import StyledSlider from "./style";

// type
import type { Settings } from "react-slick";
interface Props {
  photos: string[];
}

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

/** 2023/04/13 - 이미지 캐루셀 - by 1-blue */
const Carousel: React.FC<Props> = ({ photos }) => (
  <StyledSlider {...settings}>
    {photos.map((photo) => (
      <figure key={photo}>
        <Image
          src={photo}
          alt="이미지"
          fill
          quality={75}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </figure>
    ))}
  </StyledSlider>
);

export default Carousel;
