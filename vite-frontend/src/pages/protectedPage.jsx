import { useEffect, useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import Dashboard from "./dashboard";

const ProtectedPage = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  let name = "";
  let email = "a@gmail.com";
  groups = [];
  useEffect(() => {
    async function initMain() {
      if (token) {
        name =
          localStorage.getItem("fname") + " " + localStorage.getItem("lname");
        email = localStorage.getItem("email");
        groups = await JSON.parse(getGroups());
      }
    }
    initMain();
  }, []);

  return <Dashboard userinfo={{ name, email, groups }} />;
};

export default ProtectedPage;
