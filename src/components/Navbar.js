import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // <nav>
    //   <ul>
    //     <li><Link to="/">Home</Link></li>
    //     <li><Link to="/about">About</Link></li>
    //     <li><Link to="/services">Services</Link></li>
    //     <li><Link to="/contact">Contact</Link></li>
    //   </ul>
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
                <Link to="/"  className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  About us
                </a>
              </li>
              <li className="nav-item submenu dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Propert Listing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Contact
                </a>
              </li>
              <li className="nav-item mt-3">
                {/* <a href="#" className="btn theme_btn button_hover">
                  Sign Up
                </a> */}
                <Link to="/register"  className="btn theme_btn button_hover">Sign Up</Link>
              </li>
              <li className="nav-zitem mt-3">
                {/* <a href="#" className="btn theme_btn button_hover">
                  Sign In
                </a> */}
                   <Link to="/login"  className="btn theme_btn button_hover">Sign In</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
