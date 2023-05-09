import { getDatabaseItems } from "@/cms/notionClient";
import TagContainer from "@/components/tags/TagContainer";
import TagHeroSection from "@/components/tags/TagHeroSection";
import { getAllTags } from "@/utils/getAllTags";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Metadata } from "next";

interface TagsIndexPageProps {
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
}

const getAllTagsContent = async (): Promise<TagsIndexPageProps> => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);
  const tags = getAllTags(databaseItems);

  return {
    tags,
  };
};

const TagsIndexPage = async () => {
  const { tags } = await getAllTagsContent();

  return (
    <div className="h-[calc(100vh-72px-88px)]">
      <TagHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export default TagsIndexPage;

export const generateMetadata = async (): Promise<Metadata> => {
  if (!process.env.DATABASE_ID) return { title: "All Tags" };

  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const tags = getAllTags(databaseItems);

  return {
    title: "All Tags",
    keywords: tags.map((tag) => tag.name),
  };
};
