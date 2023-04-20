import React from "react";
import CardList from "../card/CardList";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import Pagination from "../common/Pagination";
import { ITEMS_PER_PAGE } from "@/const/const";
import { useRouter } from "next/router";

interface CardSectionProps {
  cardItems: ParsedDatabaseItemType[];
}

const CardSection = ({ cardItems }: CardSectionProps) => {
  const { query } = useRouter();
  const currentPage = query.page ? Number(query.page) : 1;

  const slicedCardItems = cardItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section>
      <div className="max-w-5xl w-4/5 mx-auto flex flex-col gap-6 py-8">
        <h3 className="font-bold text-3xl">Posts</h3>
        <CardList cardItems={slicedCardItems} />
        <Pagination totalPage={Math.ceil(cardItems.length / ITEMS_PER_PAGE)} />
      </div>
    </section>
  );
};

export default CardSection;
