import React, { ReactNode } from "react";

import "./global.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
