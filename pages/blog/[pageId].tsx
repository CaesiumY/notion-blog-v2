import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { GetStaticPaths, GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import { ParsedUrlQuery } from "querystring";

interface DetailBlogPageProps {
  recordMap: ExtendedRecordMap;
}

const DetailBlogPage = ({ recordMap }: DetailBlogPageProps) => {
  return (
    <div>
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
};

export default DetailBlogPage;

interface DetailBlogPageParams extends ParsedUrlQuery {
  pageId: string;
}

export const getStaticProps: GetStaticProps<
  DetailBlogPageProps,
  DetailBlogPageParams
> = async ({ params }) => {
  const { pageId } = params!;

  const recordMap = await getPageContent(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
