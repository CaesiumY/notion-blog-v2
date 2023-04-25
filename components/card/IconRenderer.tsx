import { ParsedDatabaseItemType } from "@/utils/parseDatabaseItems";
import Image from "next/image";

interface IconRendererProps {
  icon: ParsedDatabaseItemType["icon"];
  alt: string;
  proxyIconUrl?: string;
}

const IconRenderer = ({ icon, alt, proxyIconUrl }: IconRendererProps) => {
  if (!icon) return null;

  if (icon.type === "emoji") return <span>{icon.emoji}</span>;

  const iconUrl = icon.type === "file" ? icon.file.url : icon.external.url;

  return (
    <Image
      src={proxyIconUrl ?? iconUrl}
      alt={`${alt} icon`}
      width={28}
      height={28}
      className="rounded-full"
    />
  );
};

export default IconRenderer;
