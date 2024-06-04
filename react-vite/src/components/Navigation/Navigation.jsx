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
        <NavLink to="/cocktail-search">
          <img className="search-logo" src="/CocktailSearch.png" alt="" />
        </NavLink>
      </li>
      {/* <li>
        <NavLink to={`/users/${user.id}`}>User Profile</NavLink>
      </li> */}
      <li>
        <NavLink to="/cocktails">
          <img className="list-logo" src="/CocktailList.png" alt="" />
        </NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
