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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");

  const { selectHotel, selectedHotel } = useContext(HotelContext);

  const handlePropertyTypeChange = (e) => {
    setPropertyTypeFilter(e.target.value);
  };

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

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   const filteredListings = originalListings.filter(
  //     (hotel) =>
  //       cityFilter === "" ||
  //       hotel.country.toLowerCase().includes(cityFilter.toLowerCase())
  //   );
  //   setListings(filterListingsByPage(filteredListings, 1));
  // };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const filteredListings = originalListings.filter(
      (hotel) =>
        (cityFilter === "" ||
          hotel.country.toLowerCase().includes(cityFilter.toLowerCase())) &&
        (propertyTypeFilter === "" ||
          hotel.property_type.toLowerCase() ===
            propertyTypeFilter.toLowerCase())
    );
    console.log("Filtered Listings:", filteredListings);
    setListings(filterListingsByPage(filteredListings, 1));
  };

  const filterListingsByPage = (list, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return list.slice(startIndex, endIndex);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const filteredListings = originalListings.filter(
      (hotel) =>
        cityFilter === "" ||
        hotel.country.toLowerCase().includes(cityFilter.toLowerCase())
    );
    setListings(filterListingsByPage(filteredListings, pageNumber));
  };

  useEffect(() => {
    fetch("http://34.171.61.167:8000/properties/api/property-listings/")
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
  //number increase

  return (
    <>
      <Navbar />
      <section className="accommodation_area section_gap">
        <div className="container">
          <div>
            <p>
              Find your next stay Search low prices on hotels, AirBnB, Event Spaces and much
              more...
            </p>
          </div>
          <div
            className="row mb-5"
            style={{
              backgroundColor: "#04091e",
              borderRadius: "8px",
              // boxShadow: "1px 4px 8px rgba(0.2, 0, 0, 0.2)",
              padding: "20px",
              color: "white",
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
                  {suggestions.length > 0 && cityFilter !== "" && (
                    <>
                      {suggestions.length === 1 ? (
                        <div
                          onClick={() => handleSuggestionClick(suggestions[0])}
                        >
                          {suggestions[0]}
                        </div>
                      ) : (
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
                {/* <div className="form-group mr-1">
                  <label htmlFor="adults">Adults:</label>
                  <select className="form-control ml-1" id="adults">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div> */}
                {/* <div className="form-group mr-1">
                  <label htmlFor="children">Children:</label>
                  <select className="form-control ml-1" id="children">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div> */}
                <div className="form-group mr-1">
                  <label htmlFor="propertyType">Property Type:</label>
                  <select
                    className="form-control ml-1"
                    id="propertyType"
                    value={propertyTypeFilter}
                    onChange={handlePropertyTypeChange}
                  >
                    <option value="">All</option>
                    <option value="Hotel">Hotel</option>
                    <option value="AirBnB">AirBnB</option>
                    <option value="Event Space">Event Space</option>
                    {/* Add more options based on your property types */}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-8">
              <div className="row">
                {listings.map((hotel) => (
                  <div
                    className="row"
                    key={hotel.id}
                    style={{
                      backgroundColor: "#ffffff",
                      // borderRadius: "15px",
                      // boxShadow: "2px 4px 8px rgba(0.2, 0, 0, 0.2)",
                      border: "1px solid rgba(0.2, 0, 0, 0.2)",
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  >
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="hotel_img">
                        <img
                          src={hotel.profile_image}
                          alt={hotel.name}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="description">
                        <a href="#">
                          <h4 className="sec_h4">{hotel.name}</h4>
                        </a>
                        <p>Property Type: {hotel.property_type}</p>
                        <p>
                          Location: {hotel.location}, {hotel.city},{" "}
                          {hotel.country}
                        </p>
                        <p>Contact: {hotel.contact_number}</p>
                        <p>Property Type: {hotel.property_type}</p>
                        <Link
                          to={`/rooms/${hotel.name}`}
                          className="btn btn-primary"
                          onClick={() => handleSelectHotel(hotel.id)}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 flex-md-row">
                  <form>
                    <div className="filter-section p-3 rounded">
                      <h4>Filters</h4>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="filter1"
                        />
                        <label className="form-check-label" htmlFor="filter1">
                          Filter 1
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="filter2"
                        />
                        <label className="form-check-label" htmlFor="filter2">
                          Filter 2
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                      Apply Filters
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {listings.map((hotel) => (
                  <div className="col-md-12 mb-3" key={hotel.id}>
                    <div
                      className="card p-3"
                      style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(0.2, 0, 0, 0.2)",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            src={hotel.profile_image}
                            alt={hotel.name}
                            style={{
                              width: "100%",
                              maxHeight: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-md-6">
                          <h4 className="sec_h4">
                            <h5>{hotel.name}</h5>
                          </h4>
                          <p>Property Type: {hotel.property_type}</p>
                          <p>
                            Location: {hotel.location}, {hotel.city},{" "}
                            {hotel.country}
                          </p>
                          <p>Contact: {hotel.contact_number}</p>
                          <Link
                            to={`/rooms/${hotel.name}`}
                            className="btn theme_btn"
                            onClick={() => handleSelectHotel(hotel.id)}
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">
              <form
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0.2, 0, 0, 0.2)",
                  padding: "10px",
                }}
              >
                <div className="filter-section p-3 rounded">
                  <h6>property Type</h6>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="filter1"
                    />
                    <label className="form-check-label" htmlFor="filter1">
                      AirBnB
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="filter2"
                    />
                    <label className="form-check-label" htmlFor="filter2">
                      Hotel
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="filter2"
                    />
                    <label className="form-check-label" htmlFor="filter2">
                      Event Space
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Pagination */}
      <nav className="blog-pagination justify-content-center d-flex">
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              aria-label="Previous"
              onClick={() => paginate(currentPage - 1)}
            >
              <span aria-hidden="true">
                <span className="lnr lnr-chevron-left"></span>
              </span>
            </a>
          </li>
          {[...Array(Math.ceil(originalListings.length / itemsPerPage))].map(
            (item, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            )
          )}
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              aria-label="Next"
              onClick={() => paginate(currentPage + 1)}
            >
              <span aria-hidden="true">
                <span className="lnr lnr-chevron-right"></span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <Footer />
    </>
  );
};

export default Listing;
