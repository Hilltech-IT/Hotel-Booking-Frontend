import React, { useState, useEffect,useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../pages/SearchBar";
import useGeolocation from "../hooks/useGeolocation"; 
import { FaMapMarkerAlt } from "react-icons/fa";
import { HotelContext } from "../context/HotelContext";


const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const { country, loading: geoLoading } = useGeolocation();
  const navigate = useNavigate();
  const { selectHotel } = useContext(HotelContext);

  // Set initial location when geolocation loads
  useEffect(() => {
    if (country && !searchLocation) {
      setSearchLocation(country);
    }
  }, [country, searchLocation]);

  // Fetch all hotel data from backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/properties/api/property-listings/`);
        const data = await response.json();
        if (data?.results?.length) {
          setHotels(data.results);
          // Initial filter by geolocation if available
          const initialFilter = country 
            ? data.results.filter(h => 
                h.country.toLowerCase().includes(country.toLowerCase())
              ).slice(0, 6)
            : data.results.slice(0, 6);
          setFilteredHotels(initialFilter);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHotels();
  }, [country]);

  // Handle search form submission
  const handleSearch = ({ location }) => {
    setSearchLocation(location);
    const filtered = location 
      ? hotels.filter(hotel =>
          hotel.country.toLowerCase().includes(location.toLowerCase()) ||
          hotel.city.toLowerCase().includes(location.toLowerCase())
        )
      : hotels;
    setFilteredHotels(filtered.slice(0, 6));
  };

  // Redirect to Listing page with location
  const handleViewMore = () => {
    navigate("/listing", {
      state: {
        location: searchLocation || country
      },
    });
  };


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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

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
          <SearchBar 
            defaultLocation={searchLocation} 
            onSearch={handleSearch}
            isLoading={geoLoading}
          />
        </div>

        {/* Hotel Listings */}
        <div className="container mx-auto px-4 mt-8 max-w-7xl">
          <h2 className="text-2xl font-bold mb-6">
            {searchLocation ? `Properties in ${searchLocation}` : "Popular Properties"}
          </h2>
          
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
            <p className="text-center text-gray-500">
              {geoLoading ? "Detecting your location..." : "No properties found."}
            </p>
          )}

          {filteredHotels.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleViewMore}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                View More Properties
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

