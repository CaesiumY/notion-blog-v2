import { DEFAULT_METADATA } from "@/const/headConst";
import { PropsWithChildren } from "react";

import Footer from "@/components/layout/Footer";
import GA from "@/components/layout/GA";
import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import "@/styles/notionStyle.scss";
import "katex/dist/katex.min.css";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <GA />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata = DEFAULT_METADATA;
export const revalidate = 600;
