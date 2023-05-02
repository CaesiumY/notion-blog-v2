import { getDatabaseItems } from "@/cms/notionClient";
import PageHead from "@/components/layout/PageHead";
import TagContainer from "@/components/tags/TagContainer";
import TagHeroSection from "@/components/tags/TagHeroSection";
import { getAllTags } from "@/utils/getAllTags";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { GetStaticProps } from "next";
import React from "react";

interface TagsIndexPageProps {
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
}

const TagsIndexPage = ({ tags }: TagsIndexPageProps) => {
  const keywords = tags.map((tag) => tag.name).join(", ");

  return (
    <div className="h-[calc(100vh-72px-88px)]">
      <PageHead title="All Tags" keywords={keywords} />
      <TagHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export default TagsIndexPage;

export const getStaticProps: GetStaticProps = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);
  const tags = getAllTags(databaseItems);

  return {
    props: {
      tags,
    },
  };
};
