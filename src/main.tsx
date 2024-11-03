import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./components/Login/Login";
import App from "./components/App/App";
import "./index.scss";
import NotFound from "./components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
