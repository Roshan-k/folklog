import React from "react";
import Sidebar from "./Sidebar";
import SidePage from "./SidePage";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="main">
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="page-content">
          <SidePage />
        </div>
      </div>
    </div>
  );
};

export default Layout;
