import { COLOR_TABLE } from "@/const/const";
import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import Link from "next/link";

interface TagItemProps {
  tagItem: ParsedDatabaseItemType["tags"][number];
}

const TagItem = ({ tagItem }: TagItemProps) => {
  const { name, color } = tagItem;

  return (
    <li>
      <Link href={`/tags/${name.toLowerCase()}`}>
        <a
          className="hover:underline hover:-translate-y-1 hover:shadow-md block transition-all px-2 py-1 rounded-full font-light text-gray-800 text-sm "
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
