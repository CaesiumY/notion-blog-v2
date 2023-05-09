import { getDatabaseItems } from "@/cms/notionClient";
import { ITEMS_PER_PAGE } from "@/const/const";
import { getAllTags } from "@/utils/getAllTags";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { insertPreviewImage } from "@/utils/previewImage";
import { DatabaseItemsByTagName } from "../../page";
import TagHeroSection from "@/components/tags/TagHeroSection";
import TagContainer from "@/components/tags/TagContainer";
import CardSection from "@/components/intro/CardSection";

interface TagPageParams {
  tagName: string;
  page: string;
}

export const generateStaticParams = async (): Promise<TagPageParams[]> => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems);
  const allTags = getAllTags(databaseItems);

  const lengthByTags = allTags.reduce<Record<string, number>>(
    (acc, { name, id }) => {
      const tagItems = parsedDatabaseItems.filter(
        (item) => item.tags.findIndex((tag) => tag.id === id) > -1
      );

      acc[name] = tagItems.length;

      return acc;
    },
    {}
  );

  const paths = allTags.flatMap(({ name: tagName }) =>
    Array.from(
      { length: Math.ceil(lengthByTags[tagName] / ITEMS_PER_PAGE) },
      (_, i) => ({
        tagName,
        page: (i + 1).toString(),
      })
    )
  );

  return paths;
};

const getDatabaseItemsByTagNameWithPage = async (
  tagName: string,
  page: string
): Promise<DatabaseItemsByTagName> => {
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);

  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID, {
    filter: {
      tagName: pascalTagName,
    },
  });

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

interface TagWithPageProps {
  params: TagPageParams;
}

const TagWithPage = async ({ params: { page, tagName } }: TagWithPageProps) => {
  const { databaseItems, totalLength } =
    await getDatabaseItemsByTagNameWithPage(tagName, page);

  return (
    <div>
      {/* <PageHead title={`#${tagName}`} keywords={tagName} /> */}
      <TagHeroSection title={`#${tagName}`} />
      <CardSection cardItems={databaseItems} totalLength={totalLength} />
    </div>
  );
};

export default TagWithPage;
