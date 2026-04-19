import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/NavBar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <header>
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
