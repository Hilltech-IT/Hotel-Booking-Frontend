
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomImages from "./RoomImages";
import { BACKEND_API_URL } from "../services/constants";

const EventSpace = () => {
  const [eventSpaceData, setEventSpaceData] = useState([]);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedEventSpace, setSelectedEventSpace] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [eventSpaceImages, setEventSpaceImages] = useState([]);
  const [bookingTotals, setBookingTotals] = useState(0);
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchEventSpaceData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_API_URL}/properties/api/property-listings/${propertyId}/`
        );
        const data = await response.json();
        if (data) {
          setEventSpaceData([data]); 
        }
      } catch (error) {
        console.error("Error fetching Event Space details:", error);
      }
    };

    fetchEventSpaceData();
  }, [propertyId]);

  const handleSubmit = (eventSpace) => {
    if (eventSpace.rooms_count <= 0) {
      alert("Sorry, the Event Space is fully booked.");
      return;
    }

    setSelectedEventSpace(eventSpace);
    setShowBookingForm(true);
  };

  const getUserTokenFromSession = () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      return userData?.token || null;
    } catch (error) {
      console.error("Error retrieving token from session storage:", error);
      return null;
    }
  };

  const getUserIdFromSession = () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      return userData?.pk || null;
    } catch (error) {
      console.error("Error retrieving user ID from session storage:", error);
      return null;
    }
  };

  const calculateTotals = () => {
    const daysBooked = Math.ceil(
      (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 3600 * 24)
    );
    const totalCost =
      selectedEventSpace && selectedEventSpace.cost
        ? selectedEventSpace.cost * roomsBooked * daysBooked
        : 0;
    setBookingTotals(totalCost);
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleEventSpaceBooking = async () => {
    const selectedRoomBookedDates = selectedEventSpace.booked_dates || [];
    const selectedDates = getDatesBetween(checkinDate, checkoutDate);
    const conflictingDate = selectedDates.find((date) =>
      selectedRoomBookedDates.includes(date)
    );

    if (conflictingDate) {
      alert(
        `Sorry, ${conflictingDate} is already booked. Please choose a different date.`
      );
      return;
    }

    const token = getUserTokenFromSession();

    if (!token) {
      setLoginPrompt(true);
      console.error("Token not available.");
      return;
    }

    const userId = getUserIdFromSession();

    if (!userId) {
      console.error("User ID not available. Please login.");
      return;
    }

    const daysBooked = Math.ceil(
      (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 3600 * 24)
    );

    const amountExpected =
      selectedEventSpace && selectedEventSpace.cost
        ? selectedEventSpace.cost * roomsBooked * daysBooked
        : 0;

    const bookingData = {
      event_space: selectedEventSpace.id,
      booked_from: checkinDate,
      booked_to: checkoutDate,
      user: userId,
    };

    try {
      const response = await fetch(
        `${BACKEND_API_URL}/bookings/book-an-event-space/  `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      if (response.ok) {
        setBookingSuccess(true);
        setBookingError(null);

        setCheckinDate("");
        setCheckoutDate("");
        setRoomsBooked(1);
        setSelectedEventSpace(null);
        setShowBookingForm(false);
      } else {
        setBookingSuccess(false);
        setBookingError("Failed to book the Event Space. Please try again.");
      }
    } catch (error) {
      setBookingSuccess(false);
      setBookingError("Error booking the Event Space. Please try again later.");
      console.error("Error booking the Event Space:", error);
    }
  };

  const toggleBooking = () => {
    setShowBookingForm(!showBookingForm);
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad single-digit months and days with a leading zero
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Navbar />
      <section className="accommodation_area section_gap">
        <div className="container">
          {eventSpaceData.length > 0 && (
            <div className="row mb-4">
              {eventSpaceData.map((eventSpace) => (
                <div className="col-md-6" key={eventSpace.id}>
                  <div className="card mb-3">
                    <img
                      className="card-img-top"
                      src={eventSpace.profile_image}
                      alt={eventSpace.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{eventSpace.name}</h5>
                      <p className="card-text">
                        Location: {eventSpace.location}, {eventSpace.city},{" "}
                        {eventSpace.country}
                      </p>
                      <p className="card-text">
                        Cost: KES.{eventSpace.cost}/day
                      </p>
                      <button
                        className="btn theme_btn button_hover"
                        onClick={() => handleSubmit(eventSpace)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {showBookingForm && selectedEventSpace && (
        <div className="booking_form_right">
          <section className="hotel_booking_area mt-5">
            <div className="container">
              <div className="row hotel_booking_table">
                <div className="col-md-9 offset-md-3">
                  <div className="boking_table">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEventSpaceBooking();
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="checkIn">Check-In:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={checkinDate}
                          onChange={(e) => {
                            setCheckinDate(e.target.value);
                            calculateTotals();
                          }}
                          min={getCurrentDate()}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="checkOut">Check-Out:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={checkoutDate}
                          onChange={(e) => {
                            setCheckoutDate(e.target.value);
                            calculateTotals();
                          }}
                          min={getCurrentDate()}
                          required
                        />
                      </div>

                      {bookingTotals > 0 && (
                        <div className="form-group">
                          <p className="totals-text">
                            Total Cost: KES.{bookingTotals}
                          </p>
                        </div>
                      )}

                      <div className="book_tabel_item">
                        <button
                          type="submit"
                          className="book_now_btn button_hover"
                          style={{ marginRight: "10px" }}
                        >
                          Book Now
                        </button>

                        {/* Close Button */}
                        <button
                          type="button"
                          className="btn btn-danger mt-2"
                          onClick={() => setShowBookingForm(false)}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <div
        className={
          loginPrompt || bookingError || bookingSuccess
            ? "error_popup active"
            : "error_popup"
        }
      >
        {loginPrompt && (
          <div className="error_message">
            Please log in to book Event Space.
          </div>
        )}
        {bookingError && <div className="error_message">{bookingError}</div>}
        {bookingSuccess && (
          <div className="success_message">
            Event Space booked successfully! Check your mail for payment link!
          </div>
        )}
      </div>

      {eventSpaceImages.length > 0 && <RoomImages images={eventSpaceImages} />}

      <Footer />
    </div>
  );
};

export default EventSpace;
