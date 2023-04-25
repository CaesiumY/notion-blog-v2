import { getDatabaseItems } from "@/cms/notionClient";
import {
  PageObjectResponse,
  MultiSelectPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { MakePreviewImage } from "./previewImage";

export interface ParsedDatabaseItemType {
  id: string;
  cover: string;
  icon: PageObjectResponse["icon"];
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
  published: string;
  description: string;
  title: string;
  previewImage?: MakePreviewImage;
  proxy: {
    cover: string;
    icon: string;
  };
}

export const parseDatabaseItems = (
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  const parsedItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
    if (!("properties" in item)) return acc;
    if (item.parent.type !== "database_id") return acc;

    const { id, icon, cover, last_edited_time } = item;
    const { 태그, 작성일, 설명, 이름 } = item.properties;

    const parsedCover =
      cover?.type === "file" ? cover.file.url : cover?.external.url ?? "";

    const published = (작성일.type === "date" ? 작성일.date?.start : "") ?? "";

    const description =
      (설명.type === "rich_text" ? 설명.rich_text[0]?.plain_text : "") ?? "";
    const title = 이름.type === "title" ? 이름.title[0]?.plain_text : "";

    const tags = 태그.type === "multi_select" ? 태그.multi_select : [];

    const proxyCoverUrl = `/api/getImageFromNotion?type=cover&pageId=${id}&lastEditedTime=${last_edited_time}`;
    const proxyIconUrl = `/api/getImageFromNotion?type=icon&pageId=${id}&lastEditedTime=${last_edited_time}`;

    const parsedResult: ParsedDatabaseItemType = {
      id,
      icon,
      cover: parsedCover,
      published,
      description,
      title,
      tags,
      proxy: {
        cover: proxyCoverUrl,
        icon: proxyIconUrl,
      },
    };

    return [...acc, parsedResult];
  }, []);

  return parsedItems;
};
