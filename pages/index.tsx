import { getDatabaseItems } from "@/cms/notionClient";
import { GetStaticProps } from "next";
import React from "react";

const Home = () => {
  return <div>Home</div>;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  console.log("databaseItems :>> ", databaseItems);

  return {
    props: {},
  };
};
