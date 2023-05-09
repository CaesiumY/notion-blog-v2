import { getSearchItems } from "@/cms/notionClient";
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import { NextRequest, NextResponse } from "next/server";

export interface GetSearchResponse {
  databaseItems: ParsedDatabaseItemType[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");

  if (!query) throw new Error("query is required");

  const searchQuery = query.toString();

  const searchItems = await getSearchItems(searchQuery);

  const parsedSearchItems = parseDatabaseItems(searchItems);

  return NextResponse.json({ databaseItems: parsedSearchItems });
}
