import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../components/Topbar";
import { Box } from "@mui/material";

export default function CommonTopBar() {
  return (
    <>
      <TopBar />
      <Box sx={{ marginTop: 10, paddingX: 3 }}>
        <Outlet />
      </Box>
    </>
  );
}
