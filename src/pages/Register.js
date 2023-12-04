import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    id_number: "",
    role: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    address: "",
    country: "",
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
      const response = await fetch("http://127.0.0.1:8000/users/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, you can redirect or perform other actions here
        console.log("Registration successful!");
      } else {
        // Handle registration errors here
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="min-vh-100 py-5">
      <Navbar/>
      <div className="container bg-white rounded p-4 shadow mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Sign in or create an account</h2>
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
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
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
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
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
                  <a href="/register">Login</a> |{" "}
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

export default Register;
