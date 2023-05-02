import { getPageContent } from "@/cms/notionClient";
import PageHead from "@/components/layout/PageHead";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";

interface AboutPageProps {
  recordMap: ExtendedRecordMap;
  ogImage: string;
}

const AboutPage = ({ recordMap, ogImage }: AboutPageProps) => {
  return (
    <div>
      <PageHead title="About" image={ogImage} />
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const profileId = process.env.PROFILE_ID;

  if (!profileId) throw new Error("PROFILE_ID is not defined");

  const recordMap = await getPageContent(profileId);

  const cover = `/api/getImageFromNotion?type=cover&pageId=${profileId}`;

  return {
    props: {
      recordMap,
      ogImage: cover,
    },
    revalidate: 300,
  };
};
