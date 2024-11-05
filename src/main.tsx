import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./components/Login/Login";
import App from "./components/App/App";
import "./index.scss";
import NotFound from "./components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "../src/store/index";
import { Provider } from "react-redux";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
