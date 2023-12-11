import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [cityFilter, setCityFilter] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Filter the listings based on the entered city
    const filteredListings = listings.filter(
      (hotel) =>
        cityFilter === "" ||
        hotel.city.toLowerCase().includes(cityFilter.toLowerCase())
    );
    setListings(filteredListings);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/properties/property-listings/")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.results && Array.isArray(data.results)) {
          setListings(data.results);
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <section className="accomodation_area section_gap">
        <div className="container">
          {/* Search bar for filtering */}
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
                    className="form-control ml-2"
                    id="location"
                    placeholder="location"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  />
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
                  <a href="#" className="btn btn-primary mt-2">
                    View
                  </a>
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
    </>
  );
};

export default Listing;
