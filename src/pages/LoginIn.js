// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
// import { BACKEND_API_URL } from "../services/constants";

// const Login = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     username: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginData,
//       [name]: value,
//     });
//   };

//   //user into session
//   const handleSessionStorage = (userData) => {
//     sessionStorage.setItem("user", JSON.stringify(userData));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${BACKEND_API_URL}/users/login/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//       });

//       if (response.ok) {
//         // Login successful, you can redirect or perform other actions here
//         const responseData = await response.json(); // Parse the response JSON
//         handleSessionStorage(responseData);
//         // console.log("Login successful!");
//         navigate("/");
//       } else if (response.status === 401) {
//         setError(
//           "Invalid credentials. Please check your username/email and password."
//         );
//       } else {
//         // Handle registration errors here
//         const errorData = await response.json();
//         setError(errorData.message || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       // console.error("Error occurred:", error);
//       setError("An error occurred. Please try again."); // Update error state in case of a network or other errors
//     }
//   };

//   return (
//     <div className="min-vh-100 py-5">
//       <Navbar />
//       <div className="container bg-white rounded p-4 shadow mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <h2 className="text-center mb-4">Sign in or create an account</h2>
//             {error && <div className="alert alert-danger">{error}</div>}{" "}
//             {/* Display error message if it exists */}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="username" className="form-label">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="username"
//                   name="username"
//                   value={loginData.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="password"
//                   name="password"
//                   value={loginData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div>
//                   <label className="form-check-label">
//                     <input type="checkbox" className="form-check-input" />{" "}
//                     Remember
//                   </label>
//                 </div>
//                 <div>
//                   <a href="/register">Register</a> |{" "}
//                   <a href="/forgot-password">Reset Password</a>
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_API_URL}/users/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Login successful!", responseData);
        // Store token and user data in sessionStorage
        sessionStorage.setItem("token", responseData.access);
        sessionStorage.setItem("user", JSON.stringify(responseData.user));
        
        // Redirect to home page after successful login
        navigate("/");
      } else if (response.status === 401) {
        setError("Invalid credentials. Please check your username/email and password.");
      } else {
        setError(responseData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="/forgot-password" className="text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {isLoading ? "Logging in..." : "Sign in"}
            </button>

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-purple-600 hover:text-purple-500 font-medium">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;