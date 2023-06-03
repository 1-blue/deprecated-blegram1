import { useCallback } from "react";
import Link from "next/link";

// style
import StyledSuggestedHashtag from "./style";
import Icon from "@src/components/common/Icon";

// type
interface Props {
  content: string;
  isRecent?: boolean;
}

/** 2023/06/01 - 해시태그 추천 검색어 - by 1-blue */
const SuggestedHashtag: React.FC<Props> = ({ content, isRecent }) => {
  /** 2023/06/01 - 최근 해시태그 검색어 등록 - by 1-blue */
  const onSave = useCallback(() => {
    const hashtags = JSON.parse(
      localStorage.getItem("recentHashtags") || "[]"
    ) as string[];

    if (!hashtags.includes(content)) {
      localStorage.setItem(
        "recentHashtags",
        JSON.stringify([content, ...hashtags])
      );
    }
  }, [content]);

  return (
    <StyledSuggestedHashtag>
      <Link
        href={`/hashtag?hashtag=${content}`}
        prefetch={false}
        onClick={onSave}
      >
        {content}
      </Link>

      {isRecent && (
        <button type="button" data-type="hashtag" data-idx={content}>
          <Icon shape="x-mark" color="#000" />
        </button>
      )}
    </StyledSuggestedHashtag>
  );
};

export default SuggestedHashtag;
