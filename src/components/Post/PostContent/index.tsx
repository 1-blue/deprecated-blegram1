import { useState } from "react";

// style
import StyledPostContent from "./style";

// type
interface Props {
  content: string;
}

/** 2023/04/09 - 게시글의 내용 - by 1-blue */
const PostContent: React.FC<Props> = ({ content }) => {
  /** 2023/04/11 - 게시글 컨텐츠 미리보기 - by 1-blue */
  const [previewContent] = useState(content.split("\n")[0]);

  /** 2023/04/11 - 게시글 컨텐츠 전체 내용 보기 - by 1-blue */
  const [showAll, setShowAll] = useState(false);

  // // 2023/04/11 - 문장에 해시태그 존재하면 링크 처리 - by 1-blue
  // const preprocessHashtag = useCallback((content: string) => {
  //   return content.split(/(#[^\s#]+)/gm).map((text) => {
  //     if (text[0] !== "#") return text;

  //     return (
  //       <Link
  //         key={text}
  //         href={`/hashtag/${encodeURI(text.substr(1, text.length))}`}
  //       >
  //         <a className="post-card-content-hashtag">{text}</a>
  //       </Link>
  //     );
  //   });
  // }, []);

  return (
    <StyledPostContent>
      <p>{showAll ? content : previewContent}</p>
      {showAll || (
        <button type="button" onClick={() => setShowAll(true)}>
          ...더 보기
        </button>
      )}
    </StyledPostContent>
  );
};

export default PostContent;
