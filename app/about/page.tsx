import { getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { Metadata } from "next";
import { ExtendedRecordMap } from "notion-types";

interface AboutPageContent {
  recordMap: ExtendedRecordMap;
}

const getAboutPageContent = async (): Promise<AboutPageContent> => {
  const profileId = process.env.PROFILE_ID;

  if (!profileId) throw new Error("PROFILE_ID is not defined");

  const recordMap = await getPageContent(profileId);

  return {
    recordMap,
  };
};

const AboutPage = async () => {
  const { recordMap } = await getAboutPageContent();

  return (
    <div>
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;

export const generateMetadata = (): Metadata => {
  const profileId = process.env.PROFILE_ID;

  const cover = `/api/getImageFromNotion?type=cover&pageId=${profileId}`;

  return {
    title: "About",
    openGraph: {
      images: [cover],
    },
  };
};
