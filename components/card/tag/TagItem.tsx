import { COLOR_TABLE } from "@/const/const";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import Link from "next/link";
import React from "react";

interface TagItemProps {
  tagItem: ParsedDatabaseItemType["tags"][number];
}

const TagItem = ({ tagItem }: TagItemProps) => {
  const { name, color } = tagItem;

  return (
    <li>
      <Link href={`tag/${name.toLowerCase()}`}>
        <a
          className="hover:underline px-2 py-1 rounded-full font-light"
          style={{
            backgroundColor: COLOR_TABLE[color],
          }}
        >
          #{name}
        </a>
      </Link>
    </li>
  );
};

export default TagItem;
