import SearchInputSection from "@/components/search/SearchInputSection";
import SearchResultSection from "@/components/search/SearchResultSection";
import { Metadata } from "next";

const Search = () => {
  return (
    <div>
      <SearchInputSection />
      <SearchResultSection />
    </div>
  );
};

export default Search;

interface SearchMetadata {
  searchParams: {
    query: string;
  };
}

export const generateMetadata = ({
  searchParams: { query },
}: SearchMetadata): Metadata => {
  return {
    title: query ? `${query} - Search Results` : "Search",
  };
};
