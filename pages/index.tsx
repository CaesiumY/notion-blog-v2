import { getDatabaseItems } from "@/cms/notionClient";
import CardSection from "@/components/intro/CardSection";
import HeroSection from "@/components/intro/HeroSection";
import { ITEMS_PER_PAGE } from "@/const/const";
import {
  parseDatabaseItems,
  ParsedDatabaseItemType,
} from "@/utils/parseDatabaseItems";
import { GetStaticProps } from "next";
import React from "react";

export interface HomeProps {
  databaseItems: ParsedDatabaseItemType[];
  totalLength: number;
}

const Home = ({ databaseItems, totalLength }: HomeProps) => {
  return (
    <div>
      <HeroSection />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice(0, ITEMS_PER_PAGE)
  );

  return {
    props: {
      databaseItems: parsedDatabaseItems,
      totalLength: databaseItems.length,
    },
    revalidate: 300,
  };
};
