import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../components/Topbar";

export default function CommonTopBar() {
  return (
    <>
      <TopBar />
      <div style={{ marginTop: "72px" }}>
        <Outlet />
      </div>
    </>
  );
}
