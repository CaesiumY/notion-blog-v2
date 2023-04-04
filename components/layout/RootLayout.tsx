import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
