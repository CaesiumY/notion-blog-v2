import { GetStaticPaths, GetStaticProps } from "next";
import Home, { HomeProps } from "..";
import { getDatabaseItems } from "@/cms/notionClient";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import { ParsedUrlQuery } from "querystring";
import { ITEMS_PER_PAGE } from "@/const/const";

const HomeWithPage = ({ databaseItems, totalLength }: HomeProps) => {
  return <Home databaseItems={databaseItems} totalLength={totalLength} />;
};

export default HomeWithPage;

interface HomeWithPageParams extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<
  HomeProps,
  HomeWithPageParams
> = async ({ params }) => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const { page } = params!;

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice(
      (parseInt(page) - 1) * ITEMS_PER_PAGE,
      parseInt(page) * ITEMS_PER_PAGE
    )
  );

  return {
    props: {
      databaseItems: parsedDatabaseItems,
      totalLength: databaseItems.length,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const numberOfPages = Math.ceil(databaseItems.length / ITEMS_PER_PAGE);

  const paths = Array.from({ length: numberOfPages }, (_, i) => ({
    params: {
      page: (i + 1).toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
