import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Account from "../pages/Account";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const getLoggedInUserName = () => {
    return user ? user.username : "Guest";
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const loggedInUserName = getLoggedInUserName();

  return (
    <header className="header_area">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          {/* Brand and toggle get grouped for better mobile display */}
          <Link to="/">
            <a className="navbar-brand logo_h" href="">
              WonderWise
              <img src="" alt />
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div
            className="collapse navbar-collapse offset"
            id="navbarSupportedContent"
          >
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item active">
                {/* <a className="nav-link" href="index.html">
                  Home
                </a> */}
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  About us
                </a>
              </li> */}
              <li className="nav-item submenu dropdown">
                <Link className="nav-link" to="/listing">
                  Hotels
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li> */}
              <li className="nav-item mt-3">
                <Link to="/register" className="btn theme_btn button_hover">
                  Sign Up
                </Link>
              </li>
              <li className="nav-zitem mt-3">
                <Link to="/login" className="btn theme_btn button_hover">
                  Sign In
                </Link>
              </li>
            </ul>
            <div className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-user-circle-o" aria-hidden="true" />
                {loggedInUserName}
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/account" className="dropdown-item">
                  Account
                </Link>
            
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  Sign Out
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
