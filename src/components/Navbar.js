// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Account from "../pages/Account";

// const Navbar = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedInUser = sessionStorage.getItem("user");
//     if (loggedInUser) {
//       setUser(JSON.parse(loggedInUser));
//     }
//   }, []);

//   const getLoggedInUserName = () => {
//     return user ? user.username : "Guest";
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("user");
//     setUser(null);
//   };

//   const loggedInUserName = getLoggedInUserName();

//   return (
//     <header className="header_area">
//       <div className="container">
//         <nav className="navbar navbar-expand-lg navbar-light">
//           {/* Brand and toggle get grouped for better mobile display */}
//           <Link to="/">
//             <a className="navbar-brand logo_h" href="">
//               WonderWise
//               <img src="" alt />
//             </a>
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="icon-bar" />
//             <span className="icon-bar" />
//             <span className="icon-bar" />
//           </button>
//           {/* Collect the nav links, forms, and other content for toggling */}
//           <div
//             className="collapse navbar-collapse offset"
//             id="navbarSupportedContent"
//           >
//             <ul className="nav navbar-nav menu_nav ml-auto">
//               <li className="nav-item active">
//                 {/* <a className="nav-link" href="index.html">
//                   Home
//                 </a> */}
//                 <Link to="/" className="nav-link">
//                   Home
//                 </Link>
//               </li>
//               {/* <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   About us
//                 </a>
//               </li> */}
//               <li className="nav-item submenu dropdown">
//                 <Link className="nav-link" to="/listing">
//                   Hotels
//                 </Link>
//               </li>
//               <li className="nav-item">
//               <Link className="nav-link" to="/events">
//                   Events
//                 </Link>
//               </li>
//               <li className="nav-link mt-3">
//                 <Link to="/register" className="genric-btn primary-border small text-dark">
//                   Sign Up
//                 </Link>
//               </li>
//               <li className="nav-link mt-3">
//                 <Link to="/login" className="genric-btn primary-border small text-dark">
//                   Sign In
//                 </Link>
//               </li>
//             </ul>
//             <div className="nav-item dropdown">
//               <span
//                 className="nav-link dropdown-toggle"
//                 id="navbarDropdown"
//                 role="button"
//                 data-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               >
//                 <i className="fa fa-user-circle-o" aria-hidden="true" />
//                 {loggedInUserName}
//               </span>
//               <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                 <Link to="/account" className="dropdown-item">
//                   Account
//                 </Link>
            
//                 <Link className="dropdown-item" to="#" onClick={handleLogout}>
//                   Sign Out
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };
// export default Navbar;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const getLoggedInUserName = () => (user ? user.username : "Guest");

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const loggedInUserName = getLoggedInUserName();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">WonderWise</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/listing" className="text-gray-700 hover:text-blue-600">
              Hotels
            </Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600">
              Events
            </Link>
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <span className="text-gray-700">{loggedInUserName}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/listing"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              to="/events"
              className="block py-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/account"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
