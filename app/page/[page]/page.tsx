import { DatabaseItems } from "@/app/page";
import { getDatabaseItems } from "@/cms/notionClient";
import CardSection from "@/components/intro/CardSection";
import HeroSection from "@/components/intro/HeroSection";
import { ITEMS_PER_PAGE } from "@/const/const";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import { insertPreviewImage } from "@/utils/previewImage";

interface PageParams {
  page: string;
}

export const generateStaticParams = async (): Promise<PageParams[]> => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const numberOfPages = Math.ceil(databaseItems.length / ITEMS_PER_PAGE);

  const paths = Array.from({ length: numberOfPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));

  return paths;
};

const getDatabaseItemsWithPage = async (
  page: string
): Promise<DatabaseItems> => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice(
      (parseInt(page) - 1) * ITEMS_PER_PAGE,
      parseInt(page) * ITEMS_PER_PAGE
    )
  );

  const parsedDatabaseItemsWithPreview = await insertPreviewImage(
    parsedDatabaseItems
  );

  return {
    databaseItems: parsedDatabaseItemsWithPreview,
    totalLength: databaseItems.length,
  };
};

interface HomeWithPageProps {
  params: PageParams;
}

const HomeWithPage = async ({ params }: HomeWithPageProps) => {
  const { databaseItems, totalLength } = await getDatabaseItemsWithPage(
    params.page
  );

  return (
    <div>
      <HeroSection />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default HomeWithPage;
