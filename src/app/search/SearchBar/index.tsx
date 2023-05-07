"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// api
import { apiServiceSearch } from "@src/apis";

// component
import Icon from "@src/components/common/Icon";
import Avatar from "@src/components/common/Avatar";
import Skeleton from "@src/components/common/Skeleton";

// style
import StyledSearchFromWrapper, {
  StyledNotSuggested,
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
  const router = useRouter();
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
    useCallback(() => {
      // 1. 해시태그 검색
      if (!!suggested?.hashtags.length) {
        return router.push(`/hashtag?hashtag=${suggested.hashtags[0].content}`);
      }

      // 2. 유저 검색
      if (!!suggested?.users.length) {
        return router.push(`/${suggested.users[0].nickname}`);
      }

      // 없으면 이동 X
      toast.warning("존재하는 해시태그나 유저가 없습니다!");
    }, [suggested, router])
  );

  /** 2023/05/06 - 검색창 포커싱 여부 - by 1-blue */
  const [isFocus, setIsFocus] = useState(false);

  /** 2023/05/06 - 추천 검색어 wrapper ref - by 1-blue */
  const wrapperRef = useRef<null | HTMLFormElement>(null);

  /** 2023/05/06 - 추천 검색어 input 포커싱 잃으면 닫기 - by 1-blue */
  useEffect(() => {
    const closeHandler = (e: MouseEvent) => {
      if (!isFocus) return;
      if (!(e.target instanceof HTMLElement)) return;
      if (!wrapperRef.current) return;
      // 위쪽은 부가적인 부분이라 수정/삭제를 해도 되고 아래 부분이 핵심
      // 현재 클릭한 엘리먼트가 모달의 내부에 존재하는 엘리먼트인지 확인
      if (wrapperRef.current.contains(e.target)) return;

      // 모달을 닫는 함수
      setIsFocus(false);
    };

    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  }, [isFocus]);

  return (
    <StyledSearchFromWrapper ref={wrapperRef}>
      <StyledSearchBar>
        <form onSubmit={onSearch}>
          <input
            type="search"
            {...register("query")}
            autoFocus
            onFocus={() => setIsFocus(true)}
          />
          <button type="submit">
            <Icon shape="search" color="#FFF" size="sm" />
          </button>
        </form>
      </StyledSearchBar>

      {isFocus &&
        (isFetching ? (
          <Skeleton.Suggested />
        ) : (
          <>
            {!!suggested?.hashtags.length || !!suggested?.users.length ? (
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
                    <Link href={`/hashtag?hashtag=${content}`}>{content}</Link>
                  </li>
                ))}
              </StyledSuggestedList>
            ) : (
              <StyledNotSuggested>
                <Icon shape="exclamation-circle" color="#6b7280" size="xl" />
                <span>** 검색된 결과물이 없습니다. **</span>
                <p>일치하는 해시태그 혹은 일치하는 유저가 존재하지 않습니다.</p>
              </StyledNotSuggested>
            )}
          </>
        ))}
    </StyledSearchFromWrapper>
  );
};

export default SearchBar;
