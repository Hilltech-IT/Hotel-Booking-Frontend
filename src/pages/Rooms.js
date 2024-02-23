import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import RoomImages from "./RoomImages";
import { BACKEND_API_URL } from "../services/constants";

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
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Change this value based on your desired items per page

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
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, [propertyname]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = roomsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (room) => {
    if (room.rooms_count <= 0) {
      alert("Sorry, the rooms are fully booked for this room type.");
      return;
    }

    //end of change
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    // Debugging: Log the input dates
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    while (currentDate < end) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);

      // Debugging: Log the current date in each iteration
      // console.log("Current Date:", formattedDate);
    }

    // Debugging: Log the generated dates array
    // console.log("Dates Between:", dates);

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

  const handleRoomBooking = async () => {
    // Check for conflicts between selected dates and booked dates
    // const selectedRoomBookedDates = selectedRoom.dates_booked || [];
    // const selectedDates = getDatesBetween(checkinDate, checkoutDate);
    // const conflict = selectedDates.some((date) =>
    //   selectedRoomBookedDates.includes(date)
    // );

    // if (conflict) {
    //   alert(
    //     "Sorry, the selected dates are already booked. Please choose different dates."
    //   );
    //   return;
    // }
    // Check for conflicts between selected dates and booked dates
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

    //end
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
        "http://34.171.61.167:8000/bookings/book-a-room/",
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

  const toggleBooking = () => {
    setIsBookingVisible(!isBookingVisible);
  };

  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        const response = await fetch(
          `http://34.171.61.167:8000/properties/api/property-listings/?search=${propertyname}`
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
      <section className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h4 className="title_color">Rooms</h4>
            {/* Additional description if needed */}
          </div>
          <div className="row mb_30">
            {roomsData.length === 0 ? (
              <p className="text-center">No rooms available</p>
            ) : (
              currentRooms.map((room) => (
                <div className="col-lg-3 col-sm-6" key={room.id}>
                  <div className="accomodation_item text-center card rounded">
                    {/* <img src="/image/room1.jpg" alt="Room" /> */}
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <nav className="blog-pagination justify-content-center d-flex">
        <ul className="pagination">
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              aria-label="Previous"
              onClick={() => paginate(currentPage - 1)}
            >
              <span aria-hidden="true">
                <span className="lnr lnr-chevron-left"></span>
              </span>
            </a>
          </li>
          {[...Array(Math.ceil(roomsData.length / itemsPerPage))].map(
            (item, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            )
          )}
          <li className="page-item">
            <a
              href="#"
              className="page-link"
              aria-label="Next"
              onClick={() => paginate(currentPage + 1)}
            >
              <span aria-hidden="true">
                <span className="lnr lnr-chevron-right"></span>
              </span>
            </a>
          </li>
        </ul>
      </nav>

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
                      <div className="form-group">
                        <label htmlFor="checkIn">Check-In:</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Arrival Date"
                          value={checkinDate}
                          onChange={(e) => setCheckinDate(e.target.value)}
                          min={getCurrentDate()}
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
                          onChange={(e) => setCheckoutDate(e.target.value)}
                          min={getCurrentDate()}
                          required
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
          <div className="error_message">Please log in to book rooms.</div>
        )}
        {bookingError && <div className="error_message">{bookingError}</div>}
        {bookingSuccess && (
          <div className="success_message">
            Room booked successfully!Check Mail for payment link!
          </div>
        )}
      </div>
      {hotelImages.length > 0 && <RoomImages images={hotelImages} />}
      <Footer />
    </div>
  );
};

export default Rooms;
