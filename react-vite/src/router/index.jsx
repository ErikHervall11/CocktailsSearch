import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage/";
import HomePage from "../components/HomePage/HomePage";
import CocktailSearchPage from "../components/CocktailSearchPage/CocktailSearchPage";
import UserProfilePage from "../components/UserProfilePage/UserProfilePage";
import CreateCocktailForm from "../components/CreateCocktailForm/CreateCocktailForm";
import Layout from "./Layout";
import CocktailList from "../components/CocktailList/CocktailList";
import CocktailDetailsPage from "../components/CocktailDetailsPage/CocktailDetailsPage";

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
        path: "users/:id",
        element: <UserProfilePage />,
      },
      {
        path: "cocktails/new",
        element: <CreateCocktailForm />,
      },
      {
        path: "cocktails",
        element: <CocktailList />,
      },
      {
        path: "cocktails/:id",
        element: <CocktailDetailsPage />,
      },
    ],
  },
]);
