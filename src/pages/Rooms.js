import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import RoomImages from "./RoomImages";

const Rooms = () => {
  const [roomsData, setRoomsData] = useState([]);
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [showBookingForm, setShowBookingForm] = useState(false); // To control form visibility
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);

  const { propertyname } = useParams();

  const handleSubmit = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(true); // Show the booking form on button click
  };

  const getUserTokenFromSession = () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      if (userData && userData.token) {
        return userData.token;
      } else {
        console.error("Token not found in user data.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving token from session storage:", error);
      return null;
    }
  };
  const getUserIdFromSession = () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      if (userData && userData.pk) {
        return userData.pk; // Assuming user ID is stored as 'id'
      } else {
        console.error("User ID not found in user data.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user ID from session storage:", error);
      return null;
    }
  };

  const handleRoomBooking = async () => {
    // Check if selectedRoom exists and has available_rooms property
    // if (!selectedRoom || !selectedRoom.available_rooms) {
    //   console.error("Invalid room data or available_rooms property not found.");
    //   return;
    // }

    // console.log("Selected Room Available Rooms:", selectedRoom.available_rooms);
    // console.log("Rooms Booked:", roomsBooked);

    // if (selectedRoom.available_rooms <= 0) {
    //   alert("Sorry, the rooms are fully booked for this room type.");
    //   return;
    // }

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
        "http://127.0.0.1:8000/bookings/book-a-room/",
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
        // Reset form fields and state after successful booking
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedPropertyName = encodeURIComponent(propertyname);
        const response = await fetch(
          `http://127.0.0.1:8000/properties/api/rooms/?search=${encodedPropertyName}`
        );
        const data = await response.json();
        if (data && data.results) {
          setRoomsData(data.results);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, [propertyname]);

  // Function to toggle booking visibility
  const toggleBooking = () => {
    setIsBookingVisible(!isBookingVisible);
  };
  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        // Fetch hotel details based on the propertyname or hotel name
        const response = await fetch(
          `http://127.0.0.1:8000/properties/api/property-listings/?search=${propertyname}`
        );
        const data = await response.json();
        if (data && data.results && data.results.length > 0) {
          // Assuming the first hotel from search results has the images
          const hotelImagesData = data.results[0].images;
          setHotelImages(hotelImagesData);
        }
      } catch (error) {
        console.error("Error fetching hotel images:", error);
      }
    };

    fetchHotelImages();
  }, [propertyname]);

  return (
    <div>
      <Navbar />
      <section className="accomodation_area section_gap">
        <div className="container">
          <div className="row mb_30">
            {roomsData.map((room) => (
              <div className="col-lg-3 col-sm-6" key={room.id}>
                <div className="accomodation_item text-center card rounded">
                  {/* Display room details */}
                  <img src="/image/room1.jpg" alt="Room" />
                  <h4 className="sec_h4">{room.room_type}</h4>
                  <h6>
                    KES.{room.rate}
                    <small>/night</small>
                  </h6>
                  <p>Amenities: {room.amenities}</p>
                  <p>View: {room.view}</p>
                  <p>Available Rooms: {room.rooms_count}</p>
                  <button
                    className="btn theme_btn button_hover"
                    onClick={() => handleSubmit(room)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showBookingForm && selectedRoom && (
        <div className="booking_form_right">
          <section className="hotel_booking_area mt-5">
            <div className="container">
              <div className="row hotel_booking_table">
                <div className="col-md-9 offset-md-3">
                  <div className="boking_table">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleRoomBooking();
                      }}
                    >
                      {/* Form fields */}
                      <div className="form-group">
                        <label htmlFor="checkIn">Check-In:</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Arrival Date"
                          value={checkinDate}
                          onChange={(e) => setCheckinDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="checkOut">Check-Out:</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Departure Date"
                          value={checkoutDate}
                          onChange={(e) => setCheckoutDate(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="rooms">Rooms:</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Number of Rooms"
                          value={roomsBooked}
                          onChange={(e) => setRoomsBooked(e.target.value)}
                        />
                      </div>
                      {/* Book Now button */}
                      <div className="book_tabel_item">
                        <button
                          type="submit"
                          className="book_now_btn button_hover"
                        >
                          Book Now
                        </button>
                      </div>
                    </form>
                    {/* Close button */}
                    <div className="book_tabel_item mt-2">
                      <button
                        type="button"
                        className="btn btn-danger" // Customize classes for close button
                        onClick={() => setShowBookingForm(false)} // Function to hide the booking form
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

      {/* Error Messages */}
      {/* Changes in Error Messages Rendering */}
      <div
        className={
          loginPrompt || bookingError || bookingSuccess
            ? "error_popup active"
            : "error_popup"
        }
      >
        {loginPrompt && (
          <div className="error_message">Please log in to book rooms.</div>
        )}
        {bookingError && <div className="error_message">{bookingError}</div>}
        {bookingSuccess && (
          <div className="success_message">Room booked successfully!</div>
        )}
      </div>
      {hotelImages.length > 0 && <RoomImages images={hotelImages} />}
      {/* End of Error Messages Section */}
      <Footer />
    </div>
  );
};

export default Rooms;
