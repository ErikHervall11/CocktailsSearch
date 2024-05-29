import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage/";
import HomePage from "../components/HomePage/HomePage";
import CocktailSearchPage from "../components/CocktailSearchPage/CocktailSearchPage";
import UserProfilePage from "../components/UserProfilePage/UserProfilePage";
import CreateCocktailForm from "../components/CreateCocktailForm/CreateCocktailForm";
import Layout from "./Layout";
import CocktailList from "../components/CocktailList/CocktailList";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "cocktail-search",
        element: <CocktailSearchPage />,
      },
      {
        path: "user-profile",
        element: <UserProfilePage />,
      },
      {
        path: "create-cocktail",
        element: <CreateCocktailForm />,
      },
      {
        path: "cocktails",
        element: <CocktailList />,
      },
    ],
  },
]);
