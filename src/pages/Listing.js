import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const Listing = () => {
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
              <form className="form-inline">
                <div className="form-group mr-1">
                  <input
                    type="text"
                    className="form-control ml-2"
                    id="location"
                    placeholder="location"
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
                    {/* Options for selecting number of children */}
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* Add more options if needed */}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </form>
            </div>
          </div>
          {/* Example accommodation item (replace this with your accommodation cards) */}
          <div
            className="row"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              boxShadow: "2px 4px 8px rgba(0.2, 0, 0, 0.2)",
              padding: "20px",
            }}
          >
            <div className="col-md-6">
              <div className="accomodation_item">
                <div className="row">
                  <div className="col-md-6">
                    <div className="hotel_img">
                      <img src="image/room1.jpg" alt="Double Deluxe Room" />
                      <a href="#" className="btn theme_btn button_hover">
                        Book Now
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="description">
                      <a href="#">
                        <h4 className="sec_h4">Double Deluxe Room</h4>
                      </a>
                      <h5>
                        $250<small>/night</small>
                      </h5>
                      <p>
                        Description: The Double Deluxe Room offers spacious
                        accommodation with modern amenities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listing;
