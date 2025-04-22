import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import RoomImages from "./RoomImages";
import { BACKEND_API_URL } from "../services/constants";
import { FaBed, FaRulerCombined, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const Rooms = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const { propertyname } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedPropertyName = encodeURIComponent(propertyname);
        const response = await fetch(
          `${BACKEND_API_URL}/properties/api/rooms/?search=${encodedPropertyName}`
        );
        const data = await response.json();
        if (data && data.results) {
          setRoomsData(data.results);
        } else {
          setRoomsData([]);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRoomsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyname]);

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate < end) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
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

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const handleRoomBooking = async () => {
    const selectedRoomBookedDates = selectedRoom.dates_booked || [];
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

    if (roomsBooked > selectedRoom.available_rooms) {
      alert(
        "Sorry, the requested number of rooms exceeds the available rooms."
      );
      return;
    }

    if (!checkinDate || !checkoutDate || !roomsBooked || !selectedRoom) {
      alert("Please fill in all booking details");
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

    const bookingData = {
      room: selectedRoom.id,
      amount_expected: selectedRoom.rate * roomsBooked * daysBooked,
      booked_from: checkinDate,
      booked_to: checkoutDate,
      user: userId,
      days_booked: daysBooked,
      rooms_booked: roomsBooked,
    };

    try {
      const response = await fetch(
        `${BACKEND_API_URL}/bookings/book-a-room/`,
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
        setSelectedRoom(null);
        setShowBookingForm(false);
      } else {
        setBookingSuccess(false);
        setBookingError("Failed to book the room. Please try again.");
      }
    } catch (error) {
      setBookingSuccess(false);
      setBookingError("Error booking the room. Please try again later.");
      console.error("Error booking the room:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = roomsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (room) => {
    if (room.rooms_count <= 0) {
      alert("Sorry, the rooms are fully booked for this room type.");
      return;
    }
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        const response = await fetch(
          `${BACKEND_API_URL}/properties/api/property-listings/?search=${propertyname}`
          //`http://127.0.0.1:8000/properties/api/property-listings/?search=${propertyname}`
        );
        const data = await response.json();
        if (data && data.results && data.results.length > 0) {
          const hotelImagesData = data.results[0].images;
          setHotelImages(hotelImagesData);
        }
      } catch (error) {
        console.error("Error fetching hotel images:", error);
      }
    };

    fetchHotelImages();
  }, [propertyname]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-800 py-20 text-white px-6">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Rooms</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Experience luxury and comfort in our beautifully designed rooms
            </p>
          </div>
        </div>

        {/* Rooms Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Available Rooms</h2>
              <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
            </div>
            
            {roomsData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No rooms available at this time</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentRooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      {room.image ? (
                        <img
                          src={room.image}
                          alt={room.room_type}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image Available</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {room.rooms_count} Available
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{room.room_type}</h3>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <FaMapMarkerAlt className="mr-2 text-purple-600" />
                        <span>{room.view}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <FaBed className="text-purple-600 mr-2" />
                          <span className="text-gray-700">{room.beds || "1 King Bed"}</span>
                        </div>
                        <div className="flex items-center">
                          <FaRulerCombined className="text-purple-600 mr-2" />
                          <span className="text-gray-700">{room.size || "30 m²"}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="font-semibold">{room.rating || "4.8"}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">
                            KES {room.rate.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">per night</p>
                        </div>
                      </div>
                      
                      <button
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
                        onClick={() => handleSubmit(room)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {roomsData.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 mr-4"
                >
                  Previous
                </button>
                <span className="flex items-center mx-4">
                  Page {currentPage} of {Math.ceil(roomsData.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(roomsData.length / itemsPerPage)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 ml-4"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Hotel Images Gallery */}
        {hotelImages.length > 0 && <RoomImages images={hotelImages} />}
      </main>

      {/* Booking Form Modal */}
      {showBookingForm && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Book {selectedRoom.room_type}</h3>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleRoomBooking();
            }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={checkinDate}
                    onChange={(e) => setCheckinDate(e.target.value)}
                    min={getCurrentDate()}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={checkoutDate}
                    onChange={(e) => setCheckoutDate(e.target.value)}
                    min={checkinDate || getCurrentDate()}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Rooms
                  </label>
                  <input
                    type="number"
                    id="rooms"
                    min="1"
                    max={selectedRoom.rooms_count}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={roomsBooked}
                    onChange={(e) => setRoomsBooked(Math.min(Number(e.target.value), selectedRoom.rooms_count))}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Max {selectedRoom.rooms_count} rooms available</p>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Status Modals */}
      {(loginPrompt || bookingError || bookingSuccess) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md text-center">
            {loginPrompt && (
              <>
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Login Required</h3>
                <p className="text-gray-600 mb-4">You need to log in to book rooms.</p>
              </>
            )}
            
            {bookingError && (
              <>
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Failed</h3>
                <p className="text-gray-600 mb-4">{bookingError}</p>
              </>
            )}
            
            {bookingSuccess && (
              <>
                <div className="text-green-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-4">
                  Your room has been booked successfully. Check your email for the payment link.
                </p>
              </>
            )}
            
            <button
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold"
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

      <Footer />
    </div>
  );
};

export default Rooms;