import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-5xl flex flex-col min-h-screen px-4">
      <Header />
      <main className="flex justify-center">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
