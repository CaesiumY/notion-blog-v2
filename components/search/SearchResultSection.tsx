import { GetSearchResponse } from "@/pages/api/getSearchFromNotion";
import { useRouter } from "next/router";
import useSWR from "swr";
import CardList from "../card/CardList";
import LoadingSpinner from "../common/LoadingSpinner";

const SearchResultSection = () => {
  const { query } = useRouter();
  const searchQuery = query.query?.toString();
  const { data, isLoading, error } = useSWR(
    `/api/getSearchFromNotion?query=${searchQuery}`,
    async (url) => {
      if (!searchQuery) return;
      const response = await fetch(url);

      if (response.ok) {
        const { databaseItems }: GetSearchResponse = await response.json();
        return databaseItems;
      }
    }
  );

  return (
    <section>
      <div className="w-4/5 max-w-5xl mx-auto my-16 min-h-screen">
        {data ? <CardList cardItems={data} /> : null}
        {isLoading ? <LoadingIndicator /> : null}
        {error ? <ErrorIndicator error={error} /> : null}
      </div>
    </section>
  );
};

export default SearchResultSection;

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center my-16">
      <LoadingSpinner />
    </div>
  );
};

interface ErrorIndicatorProps {
  error: Error;
}

const ErrorIndicator = ({ error }: ErrorIndicatorProps) => {
  return <div>Something is Wrong! {error.message}</div>;
};
