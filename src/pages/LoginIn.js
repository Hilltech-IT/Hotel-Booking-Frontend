import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  //user into session
  const handleSessionStorage = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        // Login successful, you can redirect or perform other actions here
        const responseData = await response.json(); // Parse the response JSON
        handleSessionStorage(responseData);
        // console.log("Login successful!");
        navigate("/");
      } else if (response.status === 401) {
        setError(
          "Invalid credentials. Please check your username/email and password."
        );
      } else {
        // Handle registration errors here
        const errorData = await response.json();
        setError(errorData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      // console.error("Error occurred:", error);
      setError("An error occurred. Please try again."); // Update error state in case of a network or other errors
    }
  };

  return (
    <div className="min-vh-100 py-5">
      <Navbar />
      <div className="container bg-white rounded p-4 shadow mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Sign in or create an account</h2>
            {error && <div className="alert alert-danger">{error}</div>}{" "}
            {/* Display error message if it exists */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" />{" "}
                    Remember
                  </label>
                </div>
                <div>
                  <a href="/register">Register</a> |{" "}
                  <a href="/reset-password">Reset Password</a>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
