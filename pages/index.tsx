import { getDatabaseItems } from "@/cms/notionClient";
import HeroSection from "@/components/intro/HeroSection";
import {
  parseDatabaseItems,
  ParsedDatabaseItemType,
} from "@/utils/parseDatabaseItems";
import { GetStaticProps } from "next";
import React from "react";

interface HomeProps {
  databaseItems: ParsedDatabaseItemType[];
}

const Home = ({ databaseItems }: HomeProps) => {
  console.log("databaseItems :>> ", databaseItems);

  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      databaseItems: parsedDatabaseItems,
    },
  };
};
