import got from "got";
import lqip from "lqip-modern";
import { PreviewImage } from "notion-types";

export const makePreviewImage = async (url: string) => {
  const buffer = await got(url, {
    responseType: "buffer",
    resolveBodyOnly: true,
  });

  try {
    const {
      metadata: { dataURIBase64, originalHeight, originalWidth },
    } = await lqip(buffer);

    const result: PreviewImage = {
      dataURIBase64,
      originalHeight,
      originalWidth,
    };

    return result;
  } catch (error) {
    return null;
  }
};
