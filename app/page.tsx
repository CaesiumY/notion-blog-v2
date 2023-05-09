import { getDatabaseItems } from "@/cms/notionClient";
import CardSection from "@/components/intro/CardSection";
import HeroSection from "@/components/intro/HeroSection";
import { ITEMS_PER_PAGE } from "@/const/const";
import {
  parseDatabaseItems,
  ParsedDatabaseItemType,
} from "@/utils/parseDatabaseItems";
import { insertPreviewImage } from "@/utils/previewImage";

export interface DatabaseItems {
  databaseItems: ParsedDatabaseItemType[];
  totalLength: number;
}

const getFirstDatabaseItems = async (): Promise<DatabaseItems> => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const parsedDatabaseItems = parseDatabaseItems(
    databaseItems.slice(0, ITEMS_PER_PAGE)
  );

  const parsedDatabaseItemsWithPreview = await insertPreviewImage(
    parsedDatabaseItems
  );

  return {
    databaseItems: parsedDatabaseItemsWithPreview,
    totalLength: databaseItems.length,
  };
};

const Home = async () => {
  const { databaseItems, totalLength } = await getFirstDatabaseItems();

  return (
    <div>
      <HeroSection />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default Home;
