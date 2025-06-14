
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomImages from "./RoomImages";
import { BACKEND_API_URL } from "../services/constants";

const AirBnb = () => {
  const [airbnbData, setAirbnbData] = useState([]);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedAirbnb, setSelectedAirbnb] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [airbnbImages, setAirbnbImages] = useState([]);
  const [bookingTotals, setBookingTotals] = useState(0);
  const { propertyId } = useParams();

  useEffect(() => {
    const fetchAirbnbData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_API_URL}/properties/api/property-listings/${propertyId}/`
        );
        const data = await response.json();
        if (data) {
          setAirbnbData([data]);
        }
      } catch (error) {
        console.error("Error fetching Airbnb details:", error);
      }
    };

    fetchAirbnbData();
  }, [propertyId]);

  const handleSubmit = (airbnb) => {
    if (airbnb.rooms_count <= 0) {
      alert("Sorry, the Airbnb is fully booked.");
      return;
    }

    setSelectedAirbnb(airbnb);
    setShowBookingForm(true);
  };


    const getUserTokenFromSession = () => {
    try {
      const token = sessionStorage.getItem("token");
      return token || null;
    } catch (error) {
      console.error("Error retrieving access token from session storage:", error);
      return null;
    }
    };

    const getUserIdFromSession = () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      return userData?.id || null;
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
      selectedAirbnb && selectedAirbnb.cost
        ? selectedAirbnb.cost * roomsBooked * daysBooked
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

  const handleAirbnbBooking = async () => {
    const selectedAirbnbBookedDates = selectedAirbnb.booked_dates || [];
    const selectedDates = getDatesBetween(checkinDate, checkoutDate);
    const conflictingDate = selectedDates.find((date) =>
      selectedAirbnbBookedDates.includes(date)
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
      selectedAirbnb && selectedAirbnb.cost
        ? selectedAirbnb.cost * roomsBooked * daysBooked
        : 0;

    const bookingData = {
      airbnb: selectedAirbnb.id,
      booked_from: checkinDate,
      booked_to: checkoutDate,
      user: userId,
    };

    try {
      const response = await fetch(
        `${BACKEND_API_URL}/bookings/book-an-airbnb/`,
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
        setSelectedAirbnb(null);
        setShowBookingForm(false);
      } else {
        setBookingSuccess(false);
        setBookingError("Failed to book the Airbnb. Please try again.");
      }
    } catch (error) {
      setBookingSuccess(false);
      setBookingError("Error booking the Airbnb. Please try again later.");
      console.error("Error booking the Airbnb:", error);
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-screen-lg">
          {airbnbData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {airbnbData.map((airbnb) => (
                <div
                  key={airbnb.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105"
                >
                  <img
                    className="w-full h-56 object-cover"
                    src={airbnb.profile_image}
                    alt={airbnb.name}
                  />
                  <div className="p-6 space-y-4">
                    <h5 className="text-2xl font-semibold text-gray-800">
                      {airbnb.name}
                    </h5>
                    <p className="text-gray-600">
                      Location: {airbnb.location}, {airbnb.city}, {airbnb.country}
                    </p>
                    <p className="text-lg text-gray-800 font-semibold">
                      Cost: KES {airbnb.cost}/night
                    </p>
                    <button
                      className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 w-full"
                      onClick={() => handleSubmit(airbnb)}
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

      {showBookingForm && selectedAirbnb && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Book {selectedAirbnb.name}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAirbnbBooking();
              }}
            >
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Check-In:
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={checkinDate}
                  onChange={(e) => {
                    setCheckinDate(e.target.value);
                    calculateTotals();
                  }}
                  min={getCurrentDate()}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Check-Out:
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-800">
                    Total Cost: KES {bookingTotals}
                  </p>
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 w-full"
                >
                  Book Now
                </button>
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 w-full"
                  onClick={() => setShowBookingForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {(loginPrompt || bookingError || bookingSuccess) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            {loginPrompt && (
              <p className="text-red-600">Please log in to book Airbnb.</p>
            )}
            {bookingError && (
              <p className="text-red-600">{bookingError}</p>
            )}
            {bookingSuccess && (
              <p className="text-green-600">
                Airbnb booked successfully! Check your email for payment links.
              </p>
            )}
            <button
              className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              onClick={() => {
                setLoginPrompt(false);
                setBookingError(null);
                setBookingSuccess(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {airbnbImages.length > 0 && <RoomImages images={airbnbImages} />}
      <Footer />
    </div>
  );
};

export default AirBnb;
