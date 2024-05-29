import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/create-cocktail">Create Cocktail</NavLink>
      </li>
      <li>
        <NavLink to="/cocktail-search">Cocktail Search</NavLink>
      </li>
      <li>
        <NavLink to="/user-profile">User Profile</NavLink>
      </li>
      <li>
        <NavLink to="/cocktails">Cocktail List</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
