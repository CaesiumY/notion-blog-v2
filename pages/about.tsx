import { getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";

interface AboutPageProps {
  recordMap: ExtendedRecordMap;
}

const AboutPage = ({ recordMap }: AboutPageProps) => {
  return (
    <div>
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const profileId = process.env.PROFILE_ID;

  if (!profileId) throw new Error("PROFILE_ID is not defined");

  const recordMap = await getPageContent(profileId);

  return {
    props: {
      recordMap,
    },
    revalidate: 300,
  };
};
