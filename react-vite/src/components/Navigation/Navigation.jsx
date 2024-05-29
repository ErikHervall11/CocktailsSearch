import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import { useSelector } from "react-redux";

function Navigation() {
  // const user = useSelector((store) => store.session.user);

  return (
    <ul className="nav-bar">
      <li>
        <NavLink to="/">
          <img className="logo" src="/COCKTAILCOLLECTIVELOGO.jpg" alt="LOGO" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/cocktails/new">Create Cocktail</NavLink>
      </li>
      <li>
        <NavLink to="/cocktail-search">Cocktail Search</NavLink>
      </li>
      {/* <li>
        <NavLink to={`/users/${user.id}`}>User Profile</NavLink>
      </li> */}
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
