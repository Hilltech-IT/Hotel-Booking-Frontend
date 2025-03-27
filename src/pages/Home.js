// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";
// import Blogs from "./Blogs";

// const Home = () => {
//   const navigate = useNavigate();
//   //country
//   const [cityFilter, setCityFilter] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setCityFilter(value);

//     try {
//       const response = await fetch("https://restcountries.com/v3.1/all");

//       if (response.ok) {
//         const data = await response.json();
//         const countryNames = data.map((country) => country.name.common);
//         setSuggestions(
//           countryNames.filter((country) =>
//             country.toLowerCase().startsWith(value.toLowerCase())
//           )
//         );
//       } else {
//         throw new Error("Failed to fetch data");
//       }
//     } catch (error) {
//       console.error("Error fetching country suggestions:", error);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (cityFilter.trim() !== "") {
//       navigate(`/listing?country=${encodeURIComponent(cityFilter)}`);
//     } else {
//       // Handle empty search
//       // You may display an error message or handle as needed
//       console.log("Please enter a valid country");
//     }
//   };

//   const handleSuggestionClick = (value) => {
//     // Set the selected suggestion as the input value
//     setCityFilter(value);
//     // Clear the suggestions
//     setSuggestions([]);
//   };
//   //end of city search

//   return (
//     <>
//       <div>
//         <Navbar />
//         <section className="banner_area">
//           <div className="booking_table d_flex align-items-center">
//             <div
//               className="overlay bg-parallax"
//               data-stellar-ratio="0.9"
//               data-stellar-vertical-offset={0}
//               data-background
//             />
//             <div className="container">
//               <div className="banner_content text-center">
//                 <h6>Away from monotonous life</h6>
//                 <a href="#" className="btn theme_btn button_hover">
//                   Get Started
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="hotel_booking_area position">
//             <div className="container">
//               <div className="hotel_booking_table">
//                 <div className="col-md-12">
//                   <div className="boking_table">
//                     <div
//                       className="row mb-5"
//                       style={{
//                         backgroundColor: "#fffff",
//                         borderRadius: "15px",
//                         boxShadow: "2px 4px 8px rgba(0.2, 0, 0, 0.2)",
//                         padding: "10px",
//                       }}
//                     >
//                       <div className="col-md-12">
//                         <form className="form-inline" onSubmit={handleSearch}>
//                           <div className="form-group mr-1">
//                             <input
//                               type="text"
//                               className="form-control"
//                               id="location"
//                               placeholder="Location"
//                               value={cityFilter}
//                               onChange={handleInputChange}
//                             />
//                             {/* Display suggestions */}
//                             {suggestions.length > 0 && cityFilter !== "" && (
//                               <>
//                                 {suggestions.length === 1 ? (
//                                   // If only one suggestion is available, allow selection
//                                   <div
//                                     onClick={() =>
//                                       handleSuggestionClick(suggestions[0])
//                                     }
//                                   >
//                                     {suggestions[0]}
//                                   </div>
//                                 ) : (
//                                   // If multiple suggestions are available, display the dropdown
//                                   <select
//                                     className="form-control position-absolute suggestion-box"
//                                     style={{
//                                       zIndex: 100,
//                                       top: "100%",
//                                       left: 0,
//                                     }}
//                                     size={
//                                       suggestions.length > 5
//                                         ? 5
//                                         : suggestions.length
//                                     }
//                                     onBlur={() => setSuggestions([])}
//                                     onChange={(e) =>
//                                       handleSuggestionClick(e.target.value)
//                                     }
//                                   >
//                                     {suggestions.map((suggestion, index) => (
//                                       <option key={index} value={suggestion}>
//                                         <strong>
//                                           {suggestion.substring(
//                                             0,
//                                             cityFilter.length
//                                           )}
//                                         </strong>
//                                         {suggestion.substring(
//                                           cityFilter.length
//                                         )}
//                                       </option>
//                                     ))}
//                                   </select>
//                                 )}
//                               </>
//                             )}
//                           </div>
//                           <div className="form-group mr-1">
//                             <label htmlFor="checkIn">In:</label>
//                             <input
//                               type="date"
//                               className="form-control ml-1"
//                               id="checkIn"
//                               placeholder="Enter location"
//                             />
//                           </div>
//                           <div className="form-group mr-2">
//                             <label htmlFor="checkOut">out:</label>
//                             <input
//                               type="date"
//                               className="form-control ml-1"
//                               id="checkOut"
//                             />
//                           </div>
//                           <div className="form-group mr-1">
//                             <label htmlFor="rooms">Rooms:</label>
//                             <select className="form-control ml-1" id="rooms">
//                               {/* Options for selecting number of rooms */}
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                               {/* Add more options if needed */}
//                             </select>
//                           </div>
//                           <div className="form-group mr-1">
//                             <label htmlFor="adults">Adults:</label>
//                             <select className="form-control ml-1" id="adults">
//                               {/* Options for selecting number of adults */}
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               <option value="3">3</option>
//                               {/* Add more options if needed */}
//                             </select>
//                           </div>
//                           <div className="form-group mr-1">
//                             <label htmlFor="children">Children:</label>
//                             <select className="form-control ml-1" id="children">
//                               {/* Options for selecting number of children */}
//                               <option value="0">0</option>
//                               <option value="1">1</option>
//                               <option value="2">2</option>
//                               {/* Add more options if needed */}
//                             </select>
//                           </div>
//                           <div className="form-group mt-4 ml-2">
//                             <button type="submit" className="btn btn-primary">
//                               Search
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <Blogs />
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../pages/SearchBar";
import useGeolocation from "../hooks/useGeolocation"; 
import { FaMapMarkerAlt } from "react-icons/fa"

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const userCountry = useGeolocation();
  const navigate = useNavigate();

  // Fetch all hotel data from backend
  useEffect(() => {
    fetch(`${BACKEND_API_URL}/properties/api/property-listings/`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results && Array.isArray(data.results)) {
          setHotels(data.results);
          setFilteredHotels(data.results.slice(0, 6));
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle search form submission
  const handleSearch = ({ location, checkInDate, checkOutDate }) => {
    const filtered = hotels.filter((hotel) =>
      hotel.country.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredHotels(filtered.slice(0, 6)); // Show only 6 filtered hotels
  };

  // Redirect to Listing page with location and dates
  const handleViewMore = () => {
    navigate("/listing", {
      state: {
        location: userCountry,
        checkInDate: "",
        checkOutDate: "",
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div
          className="relative h-[400px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://via.placeholder.com/1920x600')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
              <p className="text-xl mb-8">Book unique hotels, homes, and more.</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="container mx-auto px-4 -mt-20 z-10 relative max-w-7xl">
          <SearchBar defaultLocation={userCountry} onSearch={handleSearch} />
        </div>

        {/* Hotel Listings */}
        <div className="container mx-auto px-4 mt-8 max-w-7xl">
          <h2 className="text-2xl font-bold mb-6">Popular Hotels</h2>
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={hotel.profile_image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      {hotel.location} {hotel.city}, {hotel.country}
                    </p>
                    <p className="text-gray-800 font-bold">${hotel.price} / night</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">⭐ {hotel.rating}</span>
                    </div>
                    <Link
                      to={`/rooms/${hotel.name}`}
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 block text-center"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No hotels found.</p>
          )}

          {/* View More Button */}
          {filteredHotels.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleViewMore}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                View More Hotels
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;



