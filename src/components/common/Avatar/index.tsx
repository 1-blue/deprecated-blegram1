import Image from "next/image";
import Link from "next/link";

// util
import { blurDataURL, combinePhotoURL } from "@src/utils";

// style
import StyledAvatar from "./style";

// type
interface Props {
  src: string | null;
  alt: string;
  href?: __next_route_internal_types__.RouteImpl<string>;
}

/** 2023/04/01 - 프로필 이미지 컴포넌트 - by 1-blue */
const Avatar: React.FC<Props> = ({ src, alt, href }) => {
  let path = "";

  if (src) {
    // 미리보기 이미지인 경우
    if (src.includes("blob")) path = src;
    // "AWS-S3"에 업로드된 이미지인 경우
    else path = combinePhotoURL(src);
  }

  return (
    <StyledAvatar>
      {href ? (
        <Link href={href} prefetch={false}>
          <Image
            src={path ? path : "/photo/user.png"}
            alt={alt}
            fill
            quality={75}
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </Link>
      ) : (
        <Image
          src={path ? path : "/photo/user.png"}
          alt={alt}
          fill
          quality={75}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      )}
    </StyledAvatar>
  );
};

export default Avatar;
