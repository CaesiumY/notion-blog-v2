import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
});

interface DatabaseQueryOption {
  filter?: {
    tagName?: string;
  };
}

export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "공개",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "태그",
          multi_select: {
            contains: option?.filter?.tagName ?? "",
          },
        },
      ],
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

export const unofficialNotionClient = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const response = await unofficialNotionClient.getPage(pageId);

  return response;
};
