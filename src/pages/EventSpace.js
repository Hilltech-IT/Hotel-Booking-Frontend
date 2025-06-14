
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
      console.error("Bearer not available.");
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
        `${BACKEND_API_URL}/bookings/book-an-event-space/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {eventSpaceData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {eventSpaceData.map((eventSpace) => (
              <div key={eventSpace.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  className="w-full h-64 object-cover"
                  src={eventSpace.profile_image}
                  alt={eventSpace.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300';
                  }}
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{eventSpace.name}</h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Location:</span> {eventSpace.location}, {eventSpace.city}, {eventSpace.country}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Cost:</span> KES {eventSpace.cost}/day
                  </p>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                    onClick={() => handleSubmit(eventSpace)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showBookingForm && selectedEventSpace && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Book {selectedEventSpace.name}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEventSpaceBooking();
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="checkIn">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={checkinDate}
                    onChange={(e) => {
                      setCheckinDate(e.target.value);
                      calculateTotals();
                    }}
                    min={getCurrentDate()}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="checkOut">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    value={checkoutDate}
                    onChange={(e) => {
                      setCheckoutDate(e.target.value);
                      calculateTotals();
                    }}
                    min={getCurrentDate()}
                    required
                  />
                </div>
              </div>

              {bookingTotals > 0 && (
                <div className="mb-6">
                  <p className="text-lg font-semibold">
                    Total Cost: KES {bookingTotals}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded transition duration-300"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded transition duration-300"
                  onClick={() => setShowBookingForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {(loginPrompt || bookingError || bookingSuccess) && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            loginPrompt || bookingError ? "bg-red-100 border-l-4 border-red-500 text-red-700" : 
            bookingSuccess ? "bg-green-100 border-l-4 border-green-500 text-green-700" : ""
          }`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {loginPrompt || bookingError ? (
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm">
                  {loginPrompt && "Please log in to book Event Space."}
                  {bookingError && bookingError}
                  {bookingSuccess && "Event Space booked successfully! Check your mail for payment link!"}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => {
                    setLoginPrompt(false);
                    setBookingError(null);
                    setBookingSuccess(false);
                  }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {eventSpaceImages.length > 0 && <RoomImages images={eventSpaceImages} />}
      </main>

      <Footer />
    </div>
  );
};

export default EventSpace;
