"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

// api
import { apiServiceSearch } from "@src/apis";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";
import Skeleton from "@src/components/common/Skeleton";

// style
import StyledSearchFromWrapper, {
  StyledSearchBar,
  StyledSuggestedList,
} from "./style";

// type
import { ApiFetchSuggestedResponse } from "@src/types/api";

interface SearchForm {
  query: string;
}

/** 2023/05/04 - 검색창 컴포넌트 - by 1-blue */
const SearchBar = () => {
  const { register, handleSubmit, watch } = useForm<SearchForm>();

  /** 2023/05/05 - 추천 검색어 패치중인지 여부 - by 1-blue */
  const [isFetching, setIsFetching] = useState(false);
  /** 2023/05/05 - 추천 검색어들 - by 1-blue */
  const [suggested, setSuggested] = useState<ApiFetchSuggestedResponse | null>(
    null
  );

  // TODO: 디바운스 헬퍼 함수 제작 후 적용
  /** 2023/05/04 - 디바운스를 적용한 추천 검색어 요청 - by 1-blue */
  const timerId = useRef<null | NodeJS.Timeout>(null);
  const query = watch("query");
  useEffect(() => {
    if (!query) return;
    if (timerId.current !== null) clearTimeout(timerId.current);

    setIsFetching(true);

    timerId.current = setTimeout(() => {
      timerId.current = null;

      apiServiceSearch
        .apiFetchSuggested({ query })
        .then((res) => setSuggested(res))
        .catch(console.error)
        .finally(() => setIsFetching(false));
    }, 400);

    return () => void (timerId.current && clearTimeout(timerId.current));
  }, [timerId, query]);

  /** 2023/05/04 - 해시태그 or 유저 검색 - by 1-blue */
  const onSearch: React.FormEventHandler<HTMLFormElement> = handleSubmit(
    useCallback(({ query }) => {
      console.log("query >> ", query);
    }, [])
  );

  return (
    <StyledSearchFromWrapper>
      <StyledSearchBar>
        <form onSubmit={onSearch}>
          <input type="search" {...register("query")} autoFocus />
          <button type="submit">
            <Icon shape="search" color="#FFF" size="sm" />
          </button>
        </form>
      </StyledSearchBar>

      {isFetching ? (
        <Skeleton.Suggested />
      ) : (
        <>
          {(!!suggested?.hashtags.length || !!suggested?.users.length) && (
            <StyledSuggestedList>
              {suggested?.users.map((user) => (
                <li key={user.idx}>
                  <Link href={`/${user.nickname}`}>
                    <Avatar
                      src={user.avatar}
                      alt={`${user.nickname}님의 아바타 이미지`}
                    />
                    <div>
                      <span>{user.nickname}</span>
                      <span>{user.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
              {suggested?.hashtags.map(({ content }) => (
                <li key={content}>
                  <Link href={`/hashtag?q=${content}`}>{content}</Link>
                </li>
              ))}
            </StyledSuggestedList>
          )}
        </>
      )}
    </StyledSearchFromWrapper>
  );
};

export default SearchBar;
