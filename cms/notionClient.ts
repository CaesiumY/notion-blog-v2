import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabaseItems = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "공개",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "작성일",
        direction: "descending",
      },
    ],
  });

  return response.results;
};
