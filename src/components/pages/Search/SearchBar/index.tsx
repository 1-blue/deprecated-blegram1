"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";

// component
import Icon from "@src/components/common/Icon";

// style
import StyledSearchBar from "./style";

interface SearchForm {
  query: string;
}

/** 2023/05/04 - 검색창 컴포넌트 - by 1-blue */
const SearchBar = () => {
  const { register, handleSubmit } = useForm<SearchForm>();

  /** 2023/05/04 - 해시태그 or 유저 검색 - by 1-blue */
  const onSearch: React.FormEventHandler<HTMLFormElement> = handleSubmit(
    useCallback(({ query }) => {
      console.log("query >> ", query);
    }, [])
  );

  return (
    <StyledSearchBar>
      <form onSubmit={onSearch}>
        <input type="search" {...register("query")} />
        <button type="submit">
          <Icon shape="search" color="#FFF" size="sm" />
        </button>
      </form>
    </StyledSearchBar>
  );
};

export default SearchBar;
