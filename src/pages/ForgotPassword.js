import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../services/constants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
    
  // country
  
  const [formData, setFormData] = useState({
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_API_URL}/users/forgot-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(formData),
        body: JSON.stringify({
          ...formData
        }),
      });

      if (response.ok) {
        // Registration successful, you can redirect or perform other actions here
        setFormData({
          email: ""  
        });
        console.log("Forgot Password send successful!");
        navigate("/");
      } else {
        // Handle registration errors here
        const errorData = await response.json(); // Assuming the server sends error messages in JSON format
        setError(errorData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
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
            {/* Display error message if exists */}
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
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

export default ForgotPassword;
