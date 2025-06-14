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
        return `/hotels/${property.id}`;
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