import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import Comments from "@/components/common/Comments";
import PageHead from "@/components/layout/PageHead";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { insertPreviewImageToRecordMap } from "@/utils/previewImage";
import { GetStaticPaths, GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import { getPageProperty, getPageTitle } from "notion-utils";
import { ParsedUrlQuery } from "querystring";

interface DetailBlogPageProps {
  recordMap: ExtendedRecordMap;
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
}

const DetailBlogPage = ({
  recordMap,
  seo: { title, description, keywords, ogImage },
}: DetailBlogPageProps) => {
  return (
    <div>
      <PageHead
        title={title}
        description={description}
        keywords={keywords}
        image={ogImage}
      />
      <NotionPageRenderer recordMap={recordMap} />
      <Comments />
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

  const previewImage = await insertPreviewImageToRecordMap(recordMap);

  const propertyValue = Object.values(recordMap.block)[0].value;

  const title = getPageTitle(recordMap);
  const keywords = getPageProperty<string[]>(
    "태그",
    propertyValue,
    recordMap
  ).join(", ");
  const description = getPageProperty<string>("설명", propertyValue, recordMap);
  const cover = `/api/getImageFromNotion?type=cover&pageId=${pageId}`;

  return {
    props: {
      recordMap: {
        ...recordMap,
        preview_images: previewImage,
      },
      seo: {
        title,
        description,
        keywords,
        ogImage: cover,
      },
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
