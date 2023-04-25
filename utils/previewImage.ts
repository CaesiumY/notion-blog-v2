import got from "got";
import lqip from "lqip-modern";
import { PreviewImage } from "notion-types";
import { ParsedDatabaseItemType } from "./parseDatabaseItems";

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
