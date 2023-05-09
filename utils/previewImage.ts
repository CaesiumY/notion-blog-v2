import got from "got";
import lqip from "lqip-modern";
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from "notion-types";
import { ParsedDatabaseItemType } from "./parseDatabaseItems";
import { getPageImageUrls } from "notion-utils";
import { defaultMapImageUrl } from "react-notion-x";

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

export type MakePreviewImage = Awaited<ReturnType<typeof makePreviewImage>>;

export const insertPreviewImage = async (
  databaseItems: ParsedDatabaseItemType[]
) => {
  const previewImage = Promise.all(
    databaseItems.map(async (item) => {
      const { cover } = item;

      const previewImage = await makePreviewImage(cover);

      return {
        ...item,
        previewImage,
      };
    })
  );

  return previewImage;
};

export const insertPreviewImageToRecordMap = async (
  recordMap: ExtendedRecordMap
): Promise<PreviewImageMap> => {
  // const urls = getPageImageUrls(recordMap, {
  //   mapImageUrl: defaultMapImageUrl,
  // });

  const urls = Object.values(recordMap.signed_urls);

  const previewImageMap = await Promise.all(
    urls.map(async (url) => [url, await makePreviewImage(url)])
  );

  return Object.fromEntries(previewImageMap);
};
