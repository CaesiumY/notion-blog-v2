import React, { PropsWithChildren } from "react";
import { DEFAULT_METADATA } from "@/const/headConst";

import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import "pretendard/dist/web/variable/pretendardvariable.css";
import "@/styles/globals.css";
import "@/styles/notionStyle.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
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
