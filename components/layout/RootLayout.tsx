import { PropsWithChildren } from "react";
import Header from "./Header";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <div>footer</div>
    </>
  );
};

export default RootLayout;
