import React, { ReactNode } from "react";
import { Navbar } from "@/components/layout/NavBar";

function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default UserLayout;
