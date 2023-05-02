import PageHead from "@/components/layout/PageHead";
import SearchInputSection from "@/components/search/SearchInputSection";
import SearchResultSection from "@/components/search/SearchResultSection";
import React from "react";

const Search = () => {
  return (
    <div>
      <PageHead title="Search" />
      <SearchInputSection />
      <SearchResultSection />
    </div>
  );
};

export default Search;
