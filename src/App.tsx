import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CommonTopBar from "./layout/CommonTopBar";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route element={<CommonTopBar />}>
        <Route path='/' element={<Home />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
