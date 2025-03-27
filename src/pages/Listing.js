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
import React, { useState, useEffect, useContext, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";
import { HotelContext } from "../context/HotelContext";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";
import SearchBar from "../pages/SearchBar";
import useGeolocation from "../hooks/useGeolocation";
import { FaMapMarkerAlt } from "react-icons/fa";

const Listing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const countryFilter = queryParams.get("country") || "";

  const [listings, setListings] = useState([]);
  const [originalListings, setOriginalListings] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [propertyTypeFilters, setPropertyTypeFilters] = useState({
    Hotel: false,
    AirBnB: false,
    EventSpace: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { country, loading: geoLoading } = useGeolocation();
  const { selectHotel } = useContext(HotelContext);

  // Initialize location state
  useEffect(() => {
    const initialLocation = location.state?.location || countryFilter || country || "";
    setSearchLocation(initialLocation);
    setCityFilter(initialLocation);
  }, [location.state?.location, countryFilter, country]);

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BACKEND_API_URL}/properties/api/property-listings/`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        if (data?.results?.length) {
          setListings(data.results);
          setOriginalListings(data.results);
        } else {
          throw new Error("No listings found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [countryFilter]);

  // Handle search form submission
  const handleSearch = ({ location }) => {
    setSearchLocation(location);
    setCityFilter(location);
    setCurrentPage(1);
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return originalListings.filter((hotel) => {
      const matchesCity = !cityFilter || 
        hotel.country.toLowerCase().includes(cityFilter.toLowerCase()) ||
        hotel.city.toLowerCase().includes(cityFilter.toLowerCase());
      
      const matchesPropertyType =
        Object.values(propertyTypeFilters).every((val) => !val) ||
        propertyTypeFilters[hotel.property_type.replace(/\s+/g, "")];

      return matchesCity && matchesPropertyType;
    });
  }, [cityFilter, propertyTypeFilters, originalListings]);

  // Pagination
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredListings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredListings, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  // Determine the correct route based on property type
  const getPropertyRoute = (property) => {
    const propertyType = property.property_type.replace(/\s+/g, "");
    switch (propertyType) {
      case "AirBnB":
        return `/airbnb/${property.id}`;
      case "EventSpace":
        return `/event-space/${property.id}`;
      default:
        return `/rooms/${property.name}`;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Filter by Property Type</h3>
          <form className="space-y-4">
            {Object.keys(propertyTypeFilters).map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={type}
                  name={type}
                  checked={propertyTypeFilters[type]}
                  onChange={(e) => {
                    setPropertyTypeFilters(prev => ({
                      ...prev,
                      [e.target.name]: e.target.checked,
                    }));
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor={type} className="ml-2 text-sm text-gray-700">
                  {type.replace(/([A-Z])/g, " $1").trim()}
                </label>
              </div>
            ))}
          </form>
        </div>

        {/* Listings Content */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <SearchBar
              defaultLocation={searchLocation}
              onSearch={handleSearch}
              isLoading={geoLoading}
            />
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {cityFilter ? `Listings in ${cityFilter}` : "All Listings"}
          </h2>

          {paginatedListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedListings.map((hotel) => (
                <div 
                  key={hotel.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={hotel.profile_image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      {hotel.location} {hotel.city}, {hotel.country}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-500 capitalize">
                        {hotel.property_type}
                      </span>
                    </div>
                    <Link
                      to={getPropertyRoute(hotel)}
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 block text-center"
                      onClick={() => selectHotel({ hotelId: hotel.id })}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              {geoLoading ? "Detecting your location..." : "No listings found."}
            </div>
          )}

          {/* Pagination */}
          {filteredListings.length > 0 && (
            <div className="mt-8 flex flex-col items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
                >
                  Previous
                </button>
                
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Showing {Math.min(((currentPage - 1) * itemsPerPage) + 1, filteredListings.length)} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredListings.length)} of{' '}
                {filteredListings.length} listings
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Listing;