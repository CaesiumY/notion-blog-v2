import { getSearchItems } from "@/cms/notionClient";
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import type { NextApiRequest, NextApiResponse } from "next";

export interface GetSearchResponse {
  databaseItems: ParsedDatabaseItemType[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSearchResponse>
) {
  const { query } = req.query;

  if (!query) throw new Error("query is required");

  const searchQuery = query.toString();

  const searchItems = await getSearchItems(searchQuery);

  const parsedSearchItems = parseDatabaseItems(searchItems);

  res.status(200).json({ databaseItems: parsedSearchItems });
}
