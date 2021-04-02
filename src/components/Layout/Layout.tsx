import React from "react";
import "bulmaswatch/solar/bulmaswatch.min.css";

export const Layout: React.FC = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Layout;
