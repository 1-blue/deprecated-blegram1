import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// component
import Icon from "@src/components/common/Icon";

// util
import { blurDataURL, combinePhotoURL, splitPhotoURL } from "@src/utils";

// style
import StyledPost from "./style";

// type
import type { PostWithData } from "@src/types/api";
interface Props {
  post: PostWithData;
}

/** 2023/05/26 - 프로필 페이지 게시글 컴포넌트 - by 1-blue */
const Post: React.FC<Props> = ({ post }) => {
  const pathname = usePathname();

  /** 2023/05/26 - 이미지들 - by 1-blue */
  const photos = splitPhotoURL(post.photos);

  /** 2023/05/26 - 첫 번째 이미지 url - by 1-blue */
  const src = combinePhotoURL(photos[0]);

  return (
    <StyledPost>
      <Image
        src={src}
        alt={`${post.user.nickname}님의 게시글 이미지`}
        fill
        quality={75}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />

      {photos.length >= 1 && <Icon shape="square-2-stack" fill color="#FFF" />}

      <Link href={{ pathname, query: { postIdx: post.idx } }}>
        <div>
          <Icon shape="heart" size="md" color="#FFF" strokeWidth={2} />
          <span>{post._count.postLikers}</span>
        </div>

        <div>
          <Icon
            shape="chat-bubble-bottom-center-text"
            size="md"
            color="#FFF"
            strokeWidth={2}
          />
          <span>{post._count.comments}</span>
        </div>
      </Link>
    </StyledPost>
  );
};

export default Post;
