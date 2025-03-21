// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import { BACKEND_API_URL } from '../services/constants';

// const Register = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);

//   // country
//   const [countries, setCountries] = useState([]);
//   const [countryData, setCountryData] = useState({ country: "" });
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     first_name: "",
//     last_name: "",
//     id_number: "",
//     role: "",
//     phone_number: "",
//     gender: "",
//     date_of_birth: "",
//     country: "",
//     address: "",
//   });

//   useEffect(() => {
//     // Fetch list of countries from REST Countries API
//     fetch("https://restcountries.com/v3.1/all")
//       .then((response) => response.json())
//       .then((data) => {
//         const countryNames = data.map((country) => country.name.official);
//         setCountries(countryNames);
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//       });
//   }, []);

//   const handleCountryChange = (event) => {
//     const { value } = event.target;
//     setCountryData({ country: value }); 
//     setFormData({
//       ...formData,
//       country: value, 
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSessionStorage = (userData) => {
//     sessionStorage.setItem("user", JSON.stringify(userData));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `${BACKEND_API_URL}/users/register/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           // body: JSON.stringify(formData),
//           body: JSON.stringify({
//             ...formData,
//             country: countryData.country, 
//           }),
//         }
//       );
//       console.log(response);

//       if (response.ok) {
//         handleSessionStorage(formData);
//         // Registration successful, you can redirect or perform other actions here
//         setFormData({
//           username: "",
//           email: "",
//           password: "",
//           first_name: "",
//           last_name: "",
//           id_number: "",
//           role: "",
//           phone_number: "",
//           gender: "",
//           date_of_birth: "2022-05-12",
//           country: "",
//           address: "",
//         });
//         //console.log("Registration successful!");
//         navigate("/");
//       } else {
//         // Handle registration errors here
//         const errorData = await response.json(); 
//         setError(errorData.message || "An error occurred. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//       setError("An error occurred. Please try again."); 
//     }
//   };


//   return (
//     <div className="min-vh-100 py-5">
//       <Navbar />
//       <div className="container bg-white rounded p-4 shadow mt-5">
//         <div className="row justify-content-center">
//           <div className="col-md-8">
//             <h2 className="text-center mb-4">Sign in or create an account</h2>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               {/* Left Column */}
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="username" className="form-label">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="first_name" className="form-label">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="first_name"
//                     name="first_name"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Additional Fields */}
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="last_name" className="form-label">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="last_name"
//                     name="last_name"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="id_number" className="form-label">
//                     ID Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="id_number"
//                     name="id_number"
//                     value={formData.id_number}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="role" className="form-label">
//                     Role
//                   </label>
//                   <select
//                     className="form-control"
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     <option value="customer">Customer</option>
//                     {/* Add other role options */}
//                   </select>
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="phone_number" className="form-label">
//                     Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="phone_number"
//                     name="phone_number"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="gender" className="form-label">
//                     Gender
//                   </label>
//                   <select
//                     className="form-control"
//                     id="gender"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     {/* Add other gender options */}
//                   </select>
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="date_of_birth" className="form-label">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     id="date_of_birth"
//                     name="date_of_birth"
//                     value={formData.date_of_birth}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <label htmlFor="country" className="form-label">
//                     Country
//                   </label>
//                   <select
//                     className="form-select"
//                     id="country"
//                     name="country"
//                     value={countryData.country}
//                     onChange={handleCountryChange}
//                     required
//                   >
//                     <option value="">Select a country</option>
//                     {countries.map((country, index) => (
//                       <option key={index} value={country}>
//                         {country}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-6">
//                   <label htmlFor="address" className="form-label">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                   />
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

// export default Register;
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../services/constants";
import Footer from "../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Country
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

  // Fetch list of countries from REST Countries API
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.official);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const { value } = event.target;
    setCountryData({ country: value });
    setFormData({
      ...formData,
      country: value,
    });
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
      const response = await fetch(`${BACKEND_API_URL}/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          country: countryData.country,
        }),
      });

      if (response.ok) {
        handleSessionStorage(formData);
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
          date_of_birth: "",
          country: "",
          address: "",
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in or create an account</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Left Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* First Name */}
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* ID Number */}
              <div>
                <label htmlFor="id_number" className="block text-sm font-medium text-gray-700">
                  ID Number
                </label>
                <input
                  type="text"
                  id="id_number"
                  name="id_number"
                  value={formData.id_number}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="customer">Customer</option>
                  {/* Add other role options */}
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  {/* Add other gender options */}
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={countryData.country}
                  onChange={handleCountryChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Select a country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;