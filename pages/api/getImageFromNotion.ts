import { getPageItem } from "@/cms/notionClient";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import got from "got";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, pageId } = req.query;

  if (!type) throw new Error("type is required");
  if (!pageId) throw new Error("pageId is required");

  const pageItem = await getPageItem(pageId.toString());

  const parsedPageItem = parseDatabaseItems([pageItem])[0];

  const { cover, icon } = parsedPageItem;

  let url = "";

  switch (type) {
    case "cover":
      url = cover;
      break;

    case "icon":
      if (icon?.type === "emoji") {
        url = "";
        break;
      }
      url = (icon?.type === "file" ? icon.file.url : icon?.external.url) ?? "";
      break;
  }

  const content = await got(url, {
    responseType: "buffer",
  });

  const contentHeader = content.headers["content-type"];
  if (!contentHeader) throw new Error("content header is not exist");

  res.setHeader("Content-Type", contentHeader);
  res.send(content.body);
}
