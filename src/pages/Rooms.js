import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

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
    if (!checkinDate || !checkoutDate || !roomsBooked || !selectedRoom) {
      alert("Please fill in all booking details");
      return;
    }
    const token = getUserTokenFromSession();
    console.log(token);

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

  return (
    <div>
      <Navbar />
      <section className="breadcrumb_area mb-2">
        <div
          className="overlay bg-parallax"
          data-stellar-ratio="0.8"
          data-stellar-vertical-offset={0}
          data-background
        />
        <div className="container">
          <div className="page-cover text-center">
            <h2 className="page-cover-tittle">Accomodation</h2>
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="active">Accomodation</li>
            </ol>
          </div>
        </div>
      </section>
      {/* errormessage */}
      {loginPrompt && (
        <div
          style={{
            color: "white",
            textAlign: "center",
            backgroundColor: "red",
            width: "50%",
            margin: "0 auto",
            marginBottom: 12,
          }}
        >
          Please log in to Book rooms.
        </div>
      )}
      {bookingError && (
        <div
          style={{
            color: "white",
            textAlign: "center",
            backgroundColor: "green",
            width: "50%",
            margin: "0 auto",
          }}
        >
          {bookingError}
        </div>
      )}
      {bookingSuccess && (
        <div
          style={{
            color: "white",
            textAlign: "center",
            backgroundColor: "green",
            width: "50%",
            margin: "0 auto",
          }}
        >
          Room booked successfully!
        </div>
      )}

      {/* Display booking form when 'Book Now' is clicked */}
      {showBookingForm && selectedRoom && (
        <section className="hotel_booking_area">
          <div className="container">
            <div className="row hotel_booking_table">
              <div className="col-md-3">
                <h2>
                  Book
                  <br /> Your Room
                </h2>
              </div>
              <div className="col-md-9">
                <div className="boking_table">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRoomBooking();
                    }}
                  >
                    <div className="row">
                      <div className="col-md-4">
                        <div className="book_tabel_item">
                          {/* Date pickers for arrival and departure */}
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Arrival Date"
                              value={checkinDate}
                              onChange={(e) => setCheckinDate(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Departure Date"
                              value={checkoutDate}
                              onChange={(e) => setCheckoutDate(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="book_tabel_item">
                          {/* Number of rooms */}
                          <div className="form-group">
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Number of Rooms"
                              value={roomsBooked}
                              onChange={(e) => setRoomsBooked(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="book_tabel_item">
                          <button
                            type="submit"
                            className="book_now_btn button_hover"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Display rooms */}
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
      <Footer />
    </div>
  );
};

export default Rooms;
