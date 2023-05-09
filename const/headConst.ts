import { Metadata } from "next";

const DEFAULT_TITLE = "MN BLOG";
const DEFAULT_DESCRIPTION = "Notion API Blog";
const DEFAULT_KEYWORDS =
  "Nextjs, Notion, Blog, Typescript, React, Tailwindcss, Notion API, Notion API Blog, swr, pretendard";
const DEFAULT_AUTHOR = "MN";
const DEFAULT_URL = "https://notion-blog-v2-dusky.vercel.app";

export const DEFAULT_METADATA: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${DEFAULT_TITLE}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL}`),
  authors: [
    {
      name: DEFAULT_AUTHOR,
    },
  ],
  alternates: {
    canonical: DEFAULT_URL,
  },
  openGraph: {
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${DEFAULT_TITLE}`,
    },
    description: DEFAULT_DESCRIPTION,
    url: DEFAULT_URL,
    type: "website",
    siteName: DEFAULT_TITLE,
  },
};
