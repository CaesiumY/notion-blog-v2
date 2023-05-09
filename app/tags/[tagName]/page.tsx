import { getDatabaseItems } from "@/cms/notionClient";
import CardSection from "@/components/intro/CardSection";
import PageHead from "@/components/layout/PageHead";
import TagHeroSection from "@/components/tags/TagHeroSection";
import { ITEMS_PER_PAGE } from "@/const/const";
import { getAllTags } from "@/utils/getAllTags";
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import { insertPreviewImage } from "@/utils/previewImage";

interface TagPageParams {
  tagName: string;
}

export const generateStaticParams = async (): Promise<TagPageParams[]> => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);
  const tags = getAllTags(databaseItems);

  const paths = tags.map(({ name: tagName }) => ({
    tagName: tagName.toLowerCase(),
  }));

  return paths;
};

export interface DatabaseItemsByTagName {
  databaseItems: ParsedDatabaseItemType[];
  totalLength: number;
}

const getDatabaseItemsByTagName = async (
  tagName: string
): Promise<DatabaseItemsByTagName> => {
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);

  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID, {
    filter: {
      tagName: pascalTagName,
    },
  });

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

interface TagPageProps {
  params: TagPageParams;
}

const TagPage = async ({ params: { tagName } }: TagPageProps) => {
  const { databaseItems, totalLength } = await getDatabaseItemsByTagName(
    tagName
  );

  return (
    <div>
      {/* <PageHead title={`#${tagName}`} keywords={tagName} /> */}
      <TagHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default TagPage;
