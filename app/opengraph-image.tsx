import { makeOgImage } from "@/utils/makeOgImage";

export const alt = "Notion Devlog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

const og = async () => await makeOgImage(alt);

export default og;
