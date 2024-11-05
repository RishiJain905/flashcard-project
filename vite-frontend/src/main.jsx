import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./components/login/login.jsx";
import Register from "./components/register/register.jsx";
import Content from "./components/content/content.jsx";
import ProtectedPage from "./pages/protectedPage.jsx";
import "./index.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { getGroups } from "./helperFunctions/axiosRequests.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Content /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
  { 
    path: "/dashboard",
    element: <ProtectedPage />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
