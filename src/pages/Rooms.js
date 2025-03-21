// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { useParams } from "react-router-dom";
// import Footer from "../components/Footer";
// import RoomImages from "./RoomImages";
// import { BACKEND_API_URL } from "../services/constants";

// const Rooms = () => {
//   const [roomsData, setRoomsData] = useState([]);
//   const [checkinDate, setCheckinDate] = useState("");
//   const [checkoutDate, setCheckoutDate] = useState("");
//   const [roomsBooked, setRoomsBooked] = useState(1);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [bookingError, setBookingError] = useState(null);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [loginPrompt, setLoginPrompt] = useState(false);
//   const [isBookingVisible, setIsBookingVisible] = useState(false);
//   const [hotelImages, setHotelImages] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4); // Change this value based on your desired items per page

//   const { propertyname } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const encodedPropertyName = encodeURIComponent(propertyname);
//         const response = await fetch(
//           `${BACKEND_API_URL}/properties/api/rooms/?search=${encodedPropertyName}`
//         );
//         const data = await response.json();
//         if (data && data.results) {
//           setRoomsData(data.results);
//         }
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//       }
//     };

//     fetchData();
//   }, [propertyname]);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentRooms = roomsData.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleSubmit = (room) => {
//     if (room.rooms_count <= 0) {
//       alert("Sorry, the rooms are fully booked for this room type.");
//       return;
//     }

//     //end of change
//     setSelectedRoom(room);
//     setShowBookingForm(true);
//   };

//   const getDatesBetween = (startDate, endDate) => {
//     const dates = [];
//     let currentDate = new Date(startDate);
//     const end = new Date(endDate);

//     // Debugging: Log the input dates
//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);

//     while (currentDate < end) {
//       const formattedDate = currentDate.toISOString().split("T")[0];
//       dates.push(formattedDate);
//       currentDate.setDate(currentDate.getDate() + 1);

//       // Debugging: Log the current date in each iteration
//       // console.log("Current Date:", formattedDate);
//     }

//     // Debugging: Log the generated dates array
//     // console.log("Dates Between:", dates);

//     return dates;
//   };

//   const getUserTokenFromSession = () => {
//     try {
//       const userData = JSON.parse(sessionStorage.getItem("user"));
//       return userData?.token || null;
//     } catch (error) {
//       console.error("Error retrieving token from session storage:", error);
//       return null;
//     }
//   };

//   const getUserIdFromSession = () => {
//     try {
//       const userData = JSON.parse(sessionStorage.getItem("user"));
//       return userData?.pk || null;
//     } catch (error) {
//       console.error("Error retrieving user ID from session storage:", error);
//       return null;
//     }
//   };

//   const handleRoomBooking = async () => {
//     // Check for conflicts between selected dates and booked dates
//     // const selectedRoomBookedDates = selectedRoom.dates_booked || [];
//     // const selectedDates = getDatesBetween(checkinDate, checkoutDate);
//     // const conflict = selectedDates.some((date) =>
//     //   selectedRoomBookedDates.includes(date)
//     // );

//     // if (conflict) {
//     //   alert(
//     //     "Sorry, the selected dates are already booked. Please choose different dates."
//     //   );
//     //   return;
//     // }
//     // Check for conflicts between selected dates and booked dates
//     const selectedRoomBookedDates = selectedRoom.dates_booked || [];
//     const selectedDates = getDatesBetween(checkinDate, checkoutDate);
//     const conflictingDate = selectedDates.find((date) =>
//       selectedRoomBookedDates.includes(date)
//     );

//     if (conflictingDate) {
//       alert(
//         `Sorry, ${conflictingDate} is already booked. Please choose a different date.`
//       );
//       return;
//     }

//     //end
//     if (roomsBooked > selectedRoom.available_rooms) {
//       alert(
//         "Sorry, the requested number of rooms exceeds the available rooms."
//       );
//       return;
//     }

//     if (!checkinDate || !checkoutDate || !roomsBooked || !selectedRoom) {
//       alert("Please fill in all booking details");
//       return;
//     }

//     const token = getUserTokenFromSession();

//     if (!token) {
//       setLoginPrompt(true);
//       console.error("Token not available.");
//       return;
//     }

//     const userId = getUserIdFromSession();

//     if (!userId) {
//       console.error("User ID not available. Please login.");
//       return;
//     }

//     const daysBooked = Math.ceil(
//       (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 3600 * 24)
//     );

//     const bookingData = {
//       room: selectedRoom.id,
//       amount_expected: selectedRoom.rate * roomsBooked * daysBooked,
//       booked_from: checkinDate,
//       booked_to: checkoutDate,
//       user: userId,
//       days_booked: daysBooked,
//       rooms_booked: roomsBooked,
//     };

//     try {
//       const response = await fetch(
//         `${BACKEND_API_URL}/bookings/book-a-room/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (response.ok) {
//         setBookingSuccess(true);
//         setBookingError(null);
//         setCheckinDate("");
//         setCheckoutDate("");
//         setRoomsBooked(1);
//         setSelectedRoom(null);
//         setShowBookingForm(false);
//       } else {
//         setBookingSuccess(false);
//         setBookingError("Failed to book the room. Please try again.");
//       }
//     } catch (error) {
//       setBookingSuccess(false);
//       setBookingError("Error booking the room. Please try again later.");
//       console.error("Error booking the room:", error);
//     }
//   };

//   const toggleBooking = () => {
//     setIsBookingVisible(!isBookingVisible);
//   };

//   useEffect(() => {
//     const fetchHotelImages = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/properties/api/property-listings/?search=${propertyname}`
//         );
//         const data = await response.json();
//         if (data && data.results && data.results.length > 0) {
//           const hotelImagesData = data.results[0].images;
//           setHotelImages(hotelImagesData);
//         }
//       } catch (error) {
//         console.error("Error fetching hotel images:", error);
//       }
//     };

//     fetchHotelImages();
//   }, [propertyname]);

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     let month = today.getMonth() + 1;
//     let day = today.getDate();

//     // Pad single-digit months and days with a leading zero
//     month = month < 10 ? `0${month}` : month;
//     day = day < 10 ? `0${day}` : day;

//     return `${year}-${month}-${day}`;
//   };

//   return (
//     <div>
//       <Navbar />
//       <section className="accomodation_area section_gap">
//         <div className="container">
//           <div className="section_title text-center">
//             <h4 className="title_color">Rooms</h4>
//             {/* Additional description if needed */}
//           </div>
//           <div className="row mb_30">
//             {roomsData.length === 0 ? (
//               <p className="text-center">No rooms available</p>
//             ) : (
//               currentRooms.map((room) => (
//                 <div className="col-lg-3 col-sm-6" key={room.id}>
//                   <div className="accomodation_item text-center card rounded">
//                     {/* <img src="/image/room1.jpg" alt="Room" /> */}
//                     <h4 className="sec_h4">{room.room_type}</h4>
//                     <h6>
//                       KES.{room.rate}
//                       <small>/night</small>
//                     </h6>
                    
//                     {/* <p>Amenities: {room.amenities}</p> */}
//                     <p>View: {room.view}</p>
//                     <p>Available Rooms: {room.rooms_count}</p>
//                     <button
//                       className="btn theme_btn button_hover"
//                       onClick={() => handleSubmit(room)}
//                     >
//                       Book Now
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Pagination */}
//       <nav className="blog-pagination justify-content-center d-flex">
//         <ul className="pagination">
//           <li className="page-item">
//             <a
//               href="#"
//               className="page-link"
//               aria-label="Previous"
//               onClick={() => paginate(currentPage - 1)}
//             >
//               <span aria-hidden="true">
//                 <span className="lnr lnr-chevron-left"></span>
//               </span>
//             </a>
//           </li>
//           {[...Array(Math.ceil(roomsData.length / itemsPerPage))].map(
//             (item, index) => (
//               <li
//                 key={index}
//                 className={`page-item ${
//                   currentPage === index + 1 ? "active" : ""
//                 }`}
//               >
//                 <a
//                   href="#"
//                   className="page-link"
//                   onClick={() => paginate(index + 1)}
//                 >
//                   {index + 1}
//                 </a>
//               </li>
//             )
//           )}
//           <li className="page-item">
//             <a
//               href="#"
//               className="page-link"
//               aria-label="Next"
//               onClick={() => paginate(currentPage + 1)}
//             >
//               <span aria-hidden="true">
//                 <span className="lnr lnr-chevron-right"></span>
//               </span>
//             </a>
//           </li>
//         </ul>
//       </nav>

//       {showBookingForm && selectedRoom && (
//         <div className="booking_form_right">
//           <section className="hotel_booking_area mt-5">
//             <div className="container">
//               <div className="row hotel_booking_table">
//                 <div className="col-md-9 offset-md-3">
//                   <div className="boking_table">
//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         handleRoomBooking();
//                       }}
//                     >
//                       <div className="form-group">
//                         <label htmlFor="checkIn">Check-In:</label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           placeholder="Arrival Date"
//                           value={checkinDate}
//                           onChange={(e) => setCheckinDate(e.target.value)}
//                           min={getCurrentDate()}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="checkOut">Check-Out:</label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           placeholder="Departure Date"
//                           value={checkoutDate}
//                           onChange={(e) => setCheckoutDate(e.target.value)}
//                           min={getCurrentDate()}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="rooms">Rooms:</label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           placeholder="Number of Rooms"
//                           value={roomsBooked}
//                           onChange={(e) => setRoomsBooked(e.target.value)}
//                         />
//                       </div>
//                       <div className="book_tabel_item">
//                         <button
//                           type="submit"
//                           className="book_now_btn button_hover"
//                         >
//                           Book Now
//                         </button>
//                       </div>
//                     </form>
//                     <div className="book_tabel_item mt-2">
//                       <button
//                         type="button"
//                         className="btn btn-danger"
//                         onClick={() => setShowBookingForm(false)}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       )}

//       <div
//         className={
//           loginPrompt || bookingError || bookingSuccess
//             ? "error_popup active"
//             : "error_popup"
//         }
//       >
//         {loginPrompt && (
//           <div className="error_message">Please log in to book rooms.</div>
//         )}
//         {bookingError && <div className="error_message">{bookingError}</div>}
//         {bookingSuccess && (
//           <div className="success_message">
//             Room booked successfully!Check Mail for payment link!
//           </div>
//         )}
//       </div>
//       {hotelImages.length > 0 && <RoomImages images={hotelImages} />}
//       <Footer />
//     </div>
//   );
// };

// export default Rooms;
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

    setSelectedRoom(room);
    setShowBookingForm(true);
  };

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

  const toggleBooking = () => {
    setIsBookingVisible(!isBookingVisible);
  };

  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/properties/api/property-listings/?search=${propertyname}`
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
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Rooms Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-gray-800">Rooms</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roomsData.length === 0 ? (
              <p className="text-center col-span-full">No rooms available</p>
            ) : (
              currentRooms.map((room) => (
                <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-semibold mb-2">{room.room_type}</h4>
                    <h6 className="text-lg text-gray-700">
                      KES {room.rate} <small className="text-sm">/night</small>
                    </h6>
                    <p className="text-gray-600">View: {room.view}</p>
                    <p className="text-gray-600">Available Rooms: {room.rooms_count}</p>
                    <button
                      className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
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
      <nav className="flex justify-center my-8">
        <ul className="flex space-x-2">
          <li>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
            >
              Previous
            </button>
          </li>
          {[...Array(Math.ceil(roomsData.length / itemsPerPage))].map(
            (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded-lg hover:bg-purple-700 hover:text-white`}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(roomsData.length / itemsPerPage)
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Booking Form */}
      {showBookingForm && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRoomBooking();
              }}
            >
              <div className="mb-4">
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                  Check-In:
                </label>
                <input
                  type="date"
                  id="checkIn"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={checkinDate}
                  onChange={(e) => setCheckinDate(e.target.value)}
                  min={getCurrentDate()}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                  Check-Out:
                </label>
                <input
                  type="date"
                  id="checkOut"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={checkoutDate}
                  onChange={(e) => setCheckoutDate(e.target.value)}
                  min={getCurrentDate()}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
                  Rooms:
                </label>
                <input
                  type="number"
                  id="rooms"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={roomsBooked}
                  onChange={(e) => setRoomsBooked(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Book Now
                </button>
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  onClick={() => setShowBookingForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error/Success Messages */}
      {(loginPrompt || bookingError || bookingSuccess) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            {loginPrompt && (
              <p className="text-red-600">Please log in to book rooms.</p>
            )}
            {bookingError && (
              <p className="text-red-600">{bookingError}</p>
            )}
            {bookingSuccess && (
              <p className="text-green-600">
                Room booked successfully! Check your email for the payment link.
              </p>
            )}
            <button
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300"
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

      {/* Hotel Images */}
      {hotelImages.length > 0 && <RoomImages images={hotelImages} />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Rooms;