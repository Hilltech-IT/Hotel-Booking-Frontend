import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Blogs from "./Blogs";

const Home = () => {
  const navigate = useNavigate();
  //country
  const [cityFilter, setCityFilter] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (cityFilter.trim() !== "") {
      navigate(`/listing?country=${encodeURIComponent(cityFilter)}`);
    } else {
      // Handle empty search
      // You may display an error message or handle as needed
      console.log("Please enter a valid country");
    }
  };

  const handleSuggestionClick = (value) => {
    // Set the selected suggestion as the input value
    setCityFilter(value);
    // Clear the suggestions
    setSuggestions([]);
  };
  //end of city search

  return (
    <>
      <div>
        <Navbar />
        <section className="banner_area">
          <div className="booking_table d_flex align-items-center">
            <div
              className="overlay bg-parallax"
              data-stellar-ratio="0.9"
              data-stellar-vertical-offset={0}
              data-background
            />
            <div className="container">
              <div className="banner_content text-center">
                <h6>Away from monotonous life</h6>
                <a href="#" className="btn theme_btn button_hover">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="hotel_booking_area position">
            <div className="container">
              <div className="hotel_booking_table">
                <div className="col-md-12">
                  <div className="boking_table">
                    <div
                      className="row mb-5"
                      style={{
                        backgroundColor: "#fffff",
                        borderRadius: "15px",
                        boxShadow: "2px 4px 8px rgba(0.2, 0, 0, 0.2)",
                        padding: "10px",
                      }}
                    >
                      <div className="col-md-12">
                        <form className="form-inline" onSubmit={handleSearch}>
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
                                    onClick={() =>
                                      handleSuggestionClick(suggestions[0])
                                    }
                                  >
                                    {suggestions[0]}
                                  </div>
                                ) : (
                                  // If multiple suggestions are available, display the dropdown
                                  <select
                                    className="form-control position-absolute suggestion-box"
                                    style={{
                                      zIndex: 100,
                                      top: "100%",
                                      left: 0,
                                    }}
                                    size={
                                      suggestions.length > 5
                                        ? 5
                                        : suggestions.length
                                    }
                                    onBlur={() => setSuggestions([])}
                                    onChange={(e) =>
                                      handleSuggestionClick(e.target.value)
                                    }
                                  >
                                    {suggestions.map((suggestion, index) => (
                                      <option key={index} value={suggestion}>
                                        <strong>
                                          {suggestion.substring(
                                            0,
                                            cityFilter.length
                                          )}
                                        </strong>
                                        {suggestion.substring(
                                          cityFilter.length
                                        )}
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
                              {/* Options for selecting number of children */}
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              {/* Add more options if needed */}
                            </select>
                          </div>
                          <div className="form-group mt-4 ml-2">
                            <button type="submit" className="btn btn-primary">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*================Banner Area =================*/}
        {/*================ Accomodation Area  =================*/}
        {/* <Recommendations /> */}
        {/*================ Accomodation Area  =================*/}

        {/*================ Testimonial Area  and Blog =================*/}
        <Blogs />
        {/*================ Recent Area  =================*/}
        {/*================ start footer Area  =================*/}
        <Footer />
      </div>
    </>
  );
};

export default Home;
