import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header_area">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          {/* Brand and toggle get grouped for better mobile display */}
          <a className="navbar-brand logo_h" href="index.html">
            HILLTECH BOOKINGS
            <img src="" alt />
          </a>
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
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  About us
                </a>
              </li>
              <li className="nav-item submenu dropdown">
                <Link className="nav-link" to="/listing">Property Listing</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
