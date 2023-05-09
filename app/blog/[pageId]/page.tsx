import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import Comments from "@/components/common/Comments";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { insertPreviewImageToRecordMap } from "@/utils/previewImage";
import { Metadata } from "next";
import { ExtendedRecordMap } from "notion-types";
import { getPageProperty, getPageTitle } from "notion-utils";

interface DetailBlogPageParams {
  pageId: string;
}

export const generateStaticParams = async (): Promise<
  DetailBlogPageParams[]
> => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const paths = databaseItems.map(({ id: pageId }) => ({
    pageId,
  }));

  return paths;
};

interface DetailBlogPageContent {
  recordMap: ExtendedRecordMap;
}

const getDetailBlogPageContent = async (
  pageId: string
): Promise<DetailBlogPageContent> => {
  const recordMap = await getPageContent(pageId);

  const previewImage = await insertPreviewImageToRecordMap(recordMap);

  return {
    recordMap: {
      ...recordMap,
      preview_images: previewImage,
    },
  };
};

interface DetailBlogPageProps {
  params: DetailBlogPageParams;
}

const DetailBlogPage = async ({ params }: DetailBlogPageProps) => {
  const { recordMap } = await getDetailBlogPageContent(params.pageId);

  return (
    <div>
      <NotionPageRenderer recordMap={recordMap} />
      <Comments />
    </div>
  );
};

export default DetailBlogPage;

export const generateMetadata = async ({
  params: { pageId },
}: DetailBlogPageProps): Promise<Metadata> => {
  const recordMap = await getPageContent(pageId);

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
    title,
    description,
    keywords,
    openGraph: {
      images: [cover],
    },
  };
};
