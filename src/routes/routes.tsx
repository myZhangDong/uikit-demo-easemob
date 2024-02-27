import React from "react";
import {
  HashRouter,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "../pages/login/login";
import ChatApp from "../pages/main/main";
import AuthCheck from "./authCheck";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login></Login>} />
        <Route
          path="/main"
          element={
            <AuthCheck>
              <ChatApp></ChatApp>
            </AuthCheck>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
