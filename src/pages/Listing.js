import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";
import { HotelContext } from "../context/HotelContext";
import Footer from "../components/Footer";

const Listing = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const countryFilter = queryParams.get("country") || "";

  const [listings, setListings] = useState([]);
  const [originalListings, setOriginalListings] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { selectHotel, selectedHotel } = useContext(HotelContext);

  const handleSelectHotel = (hotelId) => {
    selectHotel({ hotelId: hotelId });
  };

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

    const filteredListings = originalListings.filter(
      (hotel) =>
        cityFilter === "" ||
        hotel.country.toLowerCase().includes(cityFilter.toLowerCase())
    );
    setListings(filteredListings);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/properties/api/property-listings/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results && Array.isArray(data.results)) {
          setListings(data.results);
          setOriginalListings(data.results);
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [countryFilter]);

  useEffect(() => {
    if (cityFilter === "") {
      setListings(originalListings);
    }
  }, [cityFilter, originalListings]);

  return (
    <>
      <Navbar />
      <section className="accomodation_area section_gap">
        <div className="container">
          <div
            className="row mb-5"
            style={{
              backgroundColor: "#fffff",
              borderRadius: "15px",
              boxShadow: "2px 4px 8px rgba(0.2, 0, 0, 0.2)",
              padding: "20px",
            }}
          >
            <div className="col-md-12">
              <form className="form-inline" onSubmit={handleFormSubmit}>
                <div className="form-group mr-1">
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder="Location"
                    value={cityFilter}
                    onChange={handleInputChange}
                  />
                  {/* Display suggestions */}
                  {suggestions.length > 0 && cityFilter !== "" && (
                    <>
                      {suggestions.length === 1 ? (
                        // If only one suggestion is available, allow selection
                        <div
                          onClick={() => handleSuggestionClick(suggestions[0])}
                        >
                          {suggestions[0]}
                        </div>
                      ) : (
                        // If multiple suggestions are available, display the dropdown
                        <select
                          className="form-control position-absolute suggestion-box"
                          style={{ zIndex: 100, top: "100%", left: 0 }}
                          size={suggestions.length > 5 ? 5 : suggestions.length}
                          onBlur={() => setSuggestions([])}
                          onChange={(e) =>
                            handleSuggestionClick(e.target.value)
                          }
                        >
                          {suggestions.map((suggestion, index) => (
                            <option key={index} value={suggestion}>
                              <strong>
                                {suggestion.substring(0, cityFilter.length)}
                              </strong>
                              {suggestion.substring(cityFilter.length)}
                            </option>
                          ))}
                        </select>
                      )}
                    </>
                  )}
                </div>
                <div className="form-group mr-1">
                  <label htmlFor="checkIn">In:</label>
                  <input
                    type="date"
                    className="form-control ml-1"
                    id="checkIn"
                    placeholder="Enter location"
                  />
                </div>
                <div className="form-group mr-2">
                  <label htmlFor="checkOut">out:</label>
                  <input
                    type="date"
                    className="form-control ml-1"
                    id="checkOut"
                  />
                </div>
                <div className="form-group mr-1">
                  <label htmlFor="rooms">Rooms:</label>
                  <select className="form-control ml-1" id="rooms">
                    {/* Options for selecting number of rooms */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    {/* Add more options if needed */}
                  </select>
                </div>
                <div className="form-group mr-1">
                  <label htmlFor="adults">Adults:</label>
                  <select className="form-control ml-1" id="adults">
                    {/* Options for selecting number of adults */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    {/* Add more options if needed */}
                  </select>
                </div>
                <div className="form-group mr-1">
                  <label htmlFor="children">Children:</label>
                  <select className="form-control ml-1" id="children">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
            </div>
          </div>
          {/* Hotels Section*/}
          {listings.map((hotel) => (
            <div
              className="row"
              key={hotel.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "15px",
                boxShadow: "2px 4px 8px rgba(0.2, 0, 0, 0.2)",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <div className="col-md-6">
                <div className="hotel_img">
                  <img
                    src={hotel.profile_image}
                    alt={hotel.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                  {/* <a href="#" className="btn btn-primary mt-2">
                    View
                  </a> */}
                  <Link
                    to={`/rooms/${hotel.name}`}
                    className="btn btn-primary mt-2"
                    onClick={() => handleSelectHotel(hotel.id)}
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className="col-md-6">
                <div className="description">
                  <a href="#">
                    <h4 className="sec_h4">{hotel.name}</h4>
                  </a>
                  <h5>
                    ${hotel.cost}
                    <small>/night</small>
                  </h5>
                  <p>Description: {hotel.description}</p>
                  {/* Add other relevant information */}
                  <p>
                    Location: {hotel.location}, {hotel.city}, {hotel.country}
                  </p>
                  <p>Contact: {hotel.contact_number}</p>
                  {/* Add other necessary fields */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Listing;
