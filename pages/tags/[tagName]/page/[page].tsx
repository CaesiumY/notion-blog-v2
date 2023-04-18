import { getDatabaseItems } from "@/cms/notionClient";
import { ITEMS_PER_PAGE } from "@/const/const";
import { getAllTags } from "@/utils/getAllTags";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import TagPage, { TagPageProps } from "..";

const TagWithPage = ({ databaseItems, tagName, totalLength }: TagPageProps) => {
  return (
    <TagPage
      databaseItems={databaseItems}
      tagName={tagName}
      totalLength={totalLength}
    />
  );
};

export default TagWithPage;

interface TagPageParams extends ParsedUrlQuery {
  tagName: string;
  page: string;
}

export const getStaticProps: GetStaticProps<
  TagPageProps,
  TagPageParams
> = async ({ params }) => {
  const { tagName, page } = params!;

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

  return {
    props: {
      databaseItems: parsedDatabaseItems,
      tagName: pascalTagName,
      totalLength: databaseItems.length,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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
        params: {
          tagName,
          page: (i + 1).toString(),
        },
      })
    )
  );
  return {
    paths,
    fallback: "blocking",
  };
};
