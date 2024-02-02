import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomImages from "./RoomImages";

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
          `http://34.171.61.167:8000/properties/api/property-listings/${propertyId}/`
        );
        const data = await response.json();
        if (data) {
          setEventSpaceData([data]); // Assuming the response is a single event space
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

  const handleEventSpaceBooking = async () => {
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
      // amount_expected: amountExpected,
      // rooms_booked: roomsBooked,
      // days_booked: daysBooked,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/bookings/book-an-event-space/",
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

  return (
    <div>
      <Navbar />
      <section className="accommodation_area section_gap">
        <div className="container">
          {/* Render Event Space details here */}
          {eventSpaceData.length > 0 && (
            <div className="row mb_30">
              {eventSpaceData.map((eventSpace) => (
                <div className="col-lg-12" key={eventSpace.id}>
                  <div className="accommodation_item text-center card rounded">
                    <h4 className="sec_h4">{eventSpace.name}</h4>
                    <h6>KES.{eventSpace.cost}/day</h6>
                    {/* Other details you want to display */}
                    <button
                      className="btn theme_btn button_hover"
                      onClick={() => handleSubmit(eventSpace)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Booking Form */}
      {showBookingForm && selectedEventSpace && (
        <div className="booking_form_right">
          <section className="hotel_booking_area mt-5">
            <div className="container">
              <div className="row hotel_booking_table">
                <div className="col-md-12">
                  <div className="booking_table">
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
                          placeholder="Arrival Date"
                          value={checkinDate}
                          onChange={(e) => {
                            setCheckinDate(e.target.value);
                            calculateTotals();
                          }}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="checkOut">Check-Out:</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Departure Date"
                          value={checkoutDate}
                          onChange={(e) => {
                            setCheckoutDate(e.target.value);
                            calculateTotals();
                          }}
                          required
                        />
                      </div>
                      {/* <div className="form-group">
                        <label htmlFor="rooms">Rooms:</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Number of Rooms"
                          value={roomsBooked}
                          onChange={(e) => {
                            setRoomsBooked(e.target.value);
                            calculateTotals();
                          }}
                          required
                        />
                      </div> */}

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
                        >
                          Book Now
                        </button>
                      </div>
                    </form>
                    <div className="book_tabel_item mt-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setShowBookingForm(false)}
                      >
                        Close
                      </button>
                    </div>
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
            Event Space booked successfully!
          </div>
        )}
      </div>

      {eventSpaceImages.length > 0 && <RoomImages images={eventSpaceImages} />}

      <Footer />
    </div>
  );
};

export default EventSpace;
