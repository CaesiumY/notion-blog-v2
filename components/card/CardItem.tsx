import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import Image from "next/image";
import Link from "next/link";
import IconRenderer from "./IconRenderer";
import TagList from "./tag/TagList";

interface CardItemProps {
  cardItem: ParsedDatabaseItemType;
}

const CardItem = ({ cardItem }: CardItemProps) => {
  const { cover, description, icon, id, published, tags, title } = cardItem;

  return (
    <li className="rounded-2xl overflow-hidden shadow-lg group flex flex-col">
      <Link href={`blog/${id}`}>
        <a className="flex-grow">
          <div className="relative aspect-[1.3/1]">
            <Image
              src={cover}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="p-4 flex flex-col gap-4">
            <h4 className="font-bold text-2xl group-hover:text-blue-500 transition-colors flex flex-row items-center gap-1">
              <IconRenderer icon={icon} alt={title} />
              {title}
            </h4>
            {description ? (
              <p className="font-medium text-gray-600">{description}</p>
            ) : null}
            <time className="font-light text-gray-700 text-sm">
              {published}
            </time>
          </div>
        </a>
      </Link>
      {tags.length > 0 ? <TagList tags={tags} /> : null}
    </li>
  );
};

export default CardItem;
