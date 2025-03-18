// import React, { useState, useEffect, useContext } from "react";
// import Navbar from "../components/Navbar";
// import { useLocation, Link } from "react-router-dom";
// import { HotelContext } from "../context/HotelContext";
// import Footer from "../components/Footer";
// import { BACKEND_API_URL } from '../services/constants';

// const Listing = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const countryFilter = queryParams.get("country") || "";

//   const [listings, setListings] = useState([]);
//   const [originalListings, setOriginalListings] = useState([]);
//   const [cityFilter, setCityFilter] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);
//   const [propertyTypeFilter, setPropertyTypeFilter] = useState("");

//   const { selectHotel, selectedHotel } = useContext(HotelContext);

//   const handlePropertyTypeChange = (e) => {
//     setPropertyTypeFilter(e.target.value);
//   };

//   const handleSelectHotel = (hotelId) => {
//     selectHotel({ hotelId: hotelId });
//   };

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

//   const handleSuggestionClick = (value) => {
//     setCityFilter(value);
//     setSuggestions([]);
//   };

//   // const handleFormSubmit = (e) => {
//   //   e.preventDefault();

//   //   const filteredListings = originalListings.filter(
//   //     (hotel) =>
//   //       cityFilter === "" ||
//   //       hotel.country.toLowerCase().includes(cityFilter.toLowerCase())
//   //   );
//   //   setListings(filterListingsByPage(filteredListings, 1));
//   // };
//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const filteredListings = originalListings.filter(
//       (hotel) =>
//         (cityFilter === "" ||
//           hotel.country.toLowerCase().includes(cityFilter.toLowerCase())) &&
//         (propertyTypeFilter === "" ||
//           hotel.property_type.toLowerCase() ===
//             propertyTypeFilter.toLowerCase())
//     );
//     console.log("Filtered Listings:", filteredListings);
//     setListings(filterListingsByPage(filteredListings, 1));
//   };

//   const filterListingsByPage = (list, page) => {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return list.slice(startIndex, endIndex);
//   };

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     const filteredListings = originalListings.filter(
//       (hotel) =>
//         cityFilter === "" ||
//         hotel.country.toLowerCase().includes(cityFilter.toLowerCase())
//     );
//     setListings(filterListingsByPage(filteredListings, pageNumber));
//   };

//   useEffect(() => {
//     fetch(`${BACKEND_API_URL}/properties/api/property-listings/`)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.results && Array.isArray(data.results)) {
//           setListings(data.results);
//           setOriginalListings(data.results);
//         } else {
//           console.error("Invalid data format received:", data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [countryFilter]);

//   useEffect(() => {
//     if (cityFilter === "") {
//       setListings(originalListings);
//     }
//   }, [cityFilter, originalListings]);
//   //number increase

//   return (
//     <>
//       <Navbar />
//       <section className="accommodation_area section_gap">
//         <div className="container">
//           <div>
//             <p>
//               Find your next stay Search low prices on hotels, AirBnB, Event
//               Spaces and much more...
//             </p>
//           </div>
//           <div
//             className="row mb-5"
//             style={{
//               backgroundColor: "#04091e",
//               borderRadius: "8px",
//               // boxShadow: "1px 4px 8px rgba(0.2, 0, 0, 0.2)",
//               padding: "20px",
//               color: "white",
//             }}
//           >
//             <div className="col-md-12">
//               <form className="form-inline" onSubmit={handleFormSubmit}>
//                 <div className="form-group mr-1">
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="location"
//                     placeholder="Location"
//                     value={cityFilter}
//                     onChange={handleInputChange}
//                   />
//                   {suggestions.length > 0 && cityFilter !== "" && (
//                     <>
//                       {suggestions.length === 1 ? (
//                         <div
//                           onClick={() => handleSuggestionClick(suggestions[0])}
//                         >
//                           {suggestions[0]}
//                         </div>
//                       ) : (
//                         <select
//                           className="form-control position-absolute suggestion-box"
//                           style={{ zIndex: 100, top: "100%", left: 0 }}
//                           size={suggestions.length > 5 ? 5 : suggestions.length}
//                           onBlur={() => setSuggestions([])}
//                           onChange={(e) =>
//                             handleSuggestionClick(e.target.value)
//                           }
//                         >
//                           {suggestions.map((suggestion, index) => (
//                             <option key={index} value={suggestion}>
//                               <strong>
//                                 {suggestion.substring(0, cityFilter.length)}
//                               </strong>
//                               {suggestion.substring(cityFilter.length)}
//                             </option>
//                           ))}
//                         </select>
//                       )}
//                     </>
//                   )}
//                 </div>
//                 <div className="form-group mr-1">
//                   <label htmlFor="checkIn">In:</label>
//                   <input
//                     type="date"
//                     className="form-control ml-1"
//                     id="checkIn"
//                   />
//                 </div>
//                 <div className="form-group mr-2">
//                   <label htmlFor="checkOut">out:</label>
//                   <input
//                     type="date"
//                     className="form-control ml-1"
//                     id="checkOut"
//                   />
//                 </div>
//                 <div className="form-group mr-1">
//                   <label htmlFor="rooms">Rooms:</label>
//                   <select className="form-control ml-1" id="rooms">
//                     {/* Options for selecting number of rooms */}
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     {/* Add more options if needed */}
//                   </select>
//                 </div>
             
//                 <div className="form-group mr-1">
//                   <label htmlFor="propertyType">Property Type:</label>
//                   <select
//                     className="form-control ml-1"
//                     id="propertyType"
//                     value={propertyTypeFilter}
//                     onChange={handlePropertyTypeChange}
//                   >
//                     <option value="">All</option>
//                     <option value="Hotel">Hotel</option>
//                     <option value="AirBnB">AirBnB</option>
//                     <option value="Event Space">Event Space</option>
//                     {/* Add more options based on your property types */}
//                   </select>
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                   Search
//                 </button>
//               </form>
//             </div>
//           </div>
       
//           <div className="row">
//             <div className="col-md-8">
//               <div className="row">
//                 {listings.map((hotel) => (
//                   <div className="col-md-12 mb-3" key={hotel.id}>
//                     <div
//                       className="card p-3"
//                       style={{
//                         backgroundColor: "#ffffff",
//                         border: "1px solid rgba(0.2, 0, 0, 0.2)",
//                       }}
//                     >
//                       <div className="row">
//                         <div className="col-md-6">
//                           <img
//                             src={hotel.profile_image}
//                             alt={hotel.name}
//                             style={{
//                               width: "100%",
//                               maxHeight: "200px",
//                               objectFit: "cover",
//                             }}
//                           />
//                         </div>
//                         <div className="col-md-6">
//                           <h4 className="sec_h4">
//                             <h5>{hotel.name}</h5>
//                           </h4>
//                           <p>Property Type: {hotel.property_type}</p>
//                           <p>
//                             Location: {hotel.location}, {hotel.city},{" "}
//                             {hotel.country}
//                           </p>
//                           <p>Contact: {hotel.contact_number}</p>
//                           {/* <Link
//                             to={`/rooms/${hotel.name}`}
//                             className="btn theme_btn"
//                             onClick={() => handleSelectHotel(hotel.id)}
//                           >
//                             View
//                           </Link> */}
//                           {propertyTypeFilter === "AirBnB" ? (
//                             // <Link
//                             //   to={`/airbnb/${hotel.name}`}
//                             //   className="btn theme_btn"
//                             //   onClick={() => handleSelectHotel(hotel.id)}
//                             // >
//                             //   View
//                             // </Link>
//                             <Link
//                               to={`/airbnb/${hotel.id}`}
//                               className="btn theme_btn"
//                               onClick={() => handleSelectHotel(hotel.id)}
//                             >
//                               View
//                             </Link>
//                           ) : propertyTypeFilter === "Event Space" ? (
//                             <Link
//                               to={`/event-space/${hotel.id}`}
//                               className="btn theme_btn"
//                               onClick={() => handleSelectHotel(hotel.id)}
//                             >
//                               View
//                             </Link>
//                           ) : (
//                             <Link
//                               to={`/rooms/${hotel.name}`}
//                               className="btn theme_btn"
//                               onClick={() => handleSelectHotel(hotel.id)}
//                             >
//                               View
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="col-md-4">
//               <form
//                 style={{
//                   backgroundColor: "#ffffff",
//                   border: "1px solid rgba(0.2, 0, 0, 0.2)",
//                   padding: "10px",
//                 }}
//               >
//                 <div className="filter-section p-3 rounded">
//                   <h6>property Type</h6>
//                   <div className="form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id="filter1"
//                     />
//                     <label className="form-check-label" htmlFor="filter1">
//                       AirBnB
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id="filter2"
//                     />
//                     <label className="form-check-label" htmlFor="filter2">
//                       Hotel
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id="filter2"
//                     />
//                     <label className="form-check-label" htmlFor="filter2">
//                       Event Space
//                     </label>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Pagination */}
//       <nav className="blog-pagination justify-content-center d-flex">
//         <ul className="pagination">
//           <li className="page-item">
//             <a
//               href="#"
//               className="page-link"
//               aria-label="Previous"
//               onClick={() => paginate(currentPage - 1)}
//             >
//               <span aria-hidden="true">
//                 <span className="lnr lnr-chevron-left"></span>
//               </span>
//             </a>
//           </li>
//           {[...Array(Math.ceil(originalListings.length / itemsPerPage))].map(
//             (item, index) => (
//               <li
//                 key={index}
//                 className={`page-item ${
//                   currentPage === index + 1 ? "active" : ""
//                 }`}
//               >
//                 <a
//                   href="#"
//                   className="page-link"
//                   onClick={() => paginate(index + 1)}
//                 >
//                   {index + 1}
//                 </a>
//               </li>
//             )
//           )}
//           <li className="page-item">
//             <a
//               href="#"
//               className="page-link"
//               aria-label="Next"
//               onClick={() => paginate(currentPage + 1)}
//             >
//               <span aria-hidden="true">
//                 <span className="lnr lnr-chevron-right"></span>
//               </span>
//             </a>
//           </li>
//         </ul>
//       </nav>
//       <Footer />
//     </>
//   );
// };

// export default Listing;
import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";
import { HotelContext } from "../context/HotelContext";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";

const Listing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const countryFilter = queryParams.get("country") || "";

  const [listings, setListings] = useState([]);
  const [originalListings, setOriginalListings] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [propertyTypeFilters, setPropertyTypeFilters] = useState({
    Hotel: false,
    AirBnB: false,
    EventSpace: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { selectHotel } = useContext(HotelContext);

  const handlePropertyTypeChange = (e) => {
    const { name, checked } = e.target;
    setPropertyTypeFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectHotel = useCallback((hotelId) => {
    selectHotel({ hotelId: hotelId });
  }, [selectHotel]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setCityFilter(value);

    try {
      const response = await fetch("https://restcountries.com/v3.1/all");

      if (response.ok) {
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common);
        setSuggestions(
          countryNames.filter((country) =>
            country.toLowerCase().startsWith(value.toLowerCase())
          )
        );
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching country suggestions:", error);
    }
  };

  const handleSuggestionClick = (value) => {
    setCityFilter(value);
    setSuggestions([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const filteredListings = useMemo(() => {
    return originalListings.filter((hotel) => {
      const matchesCity = cityFilter === "" || hotel.country.toLowerCase().includes(cityFilter.toLowerCase());
      const matchesPropertyType =
        Object.values(propertyTypeFilters).every((val) => !val) || // If no filters are selected, show all
        propertyTypeFilters[hotel.property_type.replace(/\s+/g, "")]; // Check if the property type is selected
      return matchesCity && matchesPropertyType;
    });
  }, [cityFilter, propertyTypeFilters, originalListings]);

  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredListings.slice(startIndex, endIndex);
  }, [filteredListings, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredListings.length / itemsPerPage);
  }, [filteredListings, itemsPerPage]);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BACKEND_API_URL}/properties/api/property-listings/`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data && data.results && Array.isArray(data.results)) {
          setListings(data.results);
          setOriginalListings(data.results);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [countryFilter]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar for Filters */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Filter by Property Type</h3>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {Object.keys(propertyTypeFilters).map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  name={type}
                  checked={propertyTypeFilters[type]}
                  onChange={handlePropertyTypeChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor={type} className="ml-2 text-sm text-gray-700">
                  {type.replace(/([A-Z])/g, " $1").trim()} {/* Convert camelCase to readable text */}
                </label>
              </div>
            ))}
          </form>
        </div>

        {/* Listings */}
        <div className="w-full lg:w-3/4">
          {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <form onSubmit={handleFormSubmit} className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] relative">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter location"
                  value={cityFilter}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {suggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-[100px] self-end">
                <button
                  type="submit"
                  className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Search
                </button>
              </div>
            </form>
          </div> */}

          <h2 className="text-2xl font-bold mb-6">Popular Listings</h2>
          {paginatedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedListings.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={hotel.profile_image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                    <p className="text-gray-600 mb-2">
                      {hotel.location}, {hotel.city}, {hotel.country}
                    </p>
                    <p className="text-gray-800 font-bold">${hotel.price} / night</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">⭐ {hotel.rating}</span>
                    </div>
                    <Link
                      to={
                        propertyTypeFilters.AirBnB
                          ? `/airbnb/${hotel.id}`
                          : propertyTypeFilters.EventSpace
                          ? `/event-space/${hotel.id}`
                          : `/rooms/${hotel.name}`
                      }
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 block text-center"
                      onClick={() => handleSelectHotel(hotel.id)}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No listings found.</div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded-lg hover:bg-purple-700 hover:text-white`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Listing;