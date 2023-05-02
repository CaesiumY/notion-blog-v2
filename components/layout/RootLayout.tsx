import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PageHead from "./PageHead";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <PageHead />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
