import { getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { ExtendedRecordMap } from "notion-types";

interface AboutPageContent {
  recordMap: ExtendedRecordMap;
  ogImage: string;
}

const getAboutPageContent = async (): Promise<AboutPageContent> => {
  const profileId = process.env.PROFILE_ID;

  if (!profileId) throw new Error("PROFILE_ID is not defined");

  const recordMap = await getPageContent(profileId);

  const cover = `/api/getImageFromNotion?type=cover&pageId=${profileId}`;

  return {
    recordMap,
    ogImage: cover,
  };
};

const AboutPage = async () => {
  const { ogImage, recordMap } = await getAboutPageContent();

  return (
    <div>
      {/* <PageHead title="About" image={ogImage} /> */}
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;
