import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // country
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState({ country: "" });
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
    country: "",
    address: "",
  });
  useEffect(() => {
    // Fetch list of countries from REST Countries API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const { name, value } = event.target;
    setCountryData({ ...countryData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSessionStorage = (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
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
        handleSessionStorage(formData);
        // Registration successful, you can redirect or perform other actions here
        setFormData({
          username: "",
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          id_number: "",
          role: "",
          phone_number: "",
          gender: "",
          date_of_birth: "2022-05-12",
          country: "",
          address: "",
        });
        console.log("Registration successful!");
        navigate("/");
      } else {
        // Handle registration errors here
        const errorData = await response.json(); // Assuming the server sends error messages in JSON format
        setError(errorData.message); // Update error state with the error message received from the server
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
              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* ID Number */}
              <div className="mb-3">
                <label htmlFor="id_number" className="form-label">
                  ID Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id_number"
                  name="id_number"
                  value={formData.id_number}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Role */}
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-control"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="customer">Customer</option>
                  {/* Add other role options */}
                </select>
              </div>
              {/* Phone Number */}
              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Gender */}
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  {/* Add other gender options */}
                </select>
              </div>
              {/* Date of Birth */}
              <div className="mb-3">
                <label htmlFor="date_of_birth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Country */}
              {/* <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className="form-select"
                  id="country"
                  name="country"
                  value={countryData.country}
                  onChange={ handleCountryChange }
                  required
                >
                  <option value="">Select a country</option>
                  {/* Populate options with fetched countries */}
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              {/* Address */}
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
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

export default Register;
