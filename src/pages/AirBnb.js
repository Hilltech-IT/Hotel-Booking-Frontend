// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import RoomImages from "./RoomImages";

// const AirBnb = () => {
//   const [airbnbData, setAirbnbData] = useState([]);
//   const [checkinDate, setCheckinDate] = useState("");
//   const [checkoutDate, setCheckoutDate] = useState("");
//   const [roomsBooked, setRoomsBooked] = useState(1);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [selectedAirbnb, setSelectedAirbnb] = useState(null);
//   const [bookingError, setBookingError] = useState(null);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [loginPrompt, setLoginPrompt] = useState(false);
//   const [airbnbImages, setAirbnbImages] = useState([]);
//   const [bookingTotals, setBookingTotals] = useState(0);
//   const { propertyId } = useParams();

//   useEffect(() => {
//     const fetchAirbnbData = async () => {
//       try {
//         const response = await fetch(
//           `http://34.171.61.167:8000/properties/api/property-listings/${propertyId}/`
//         );
//         const data = await response.json();
//         if (data) {
//           setAirbnbData([data]); // Assuming the response is a single property
//         }
//       } catch (error) {
//         console.error("Error fetching Airbnb details:", error);
//       }
//     };

//     fetchAirbnbData();
//   }, [propertyId]);

//   const handleSubmit = (airbnb) => {
//     if (airbnb.rooms_count <= 0) {
//       alert("Sorry, the Airbnb is fully booked.");
//       return;
//     }

//     setSelectedAirbnb(airbnb);
//     setShowBookingForm(true);
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

//   const calculateTotals = () => {
//     const daysBooked = Math.ceil(
//       (new Date(checkoutDate) - new Date(checkinDate)) / (1000 * 3600 * 24)
//     );
//     const totalCost =
//       selectedAirbnb && selectedAirbnb.cost
//         ? selectedAirbnb.cost * roomsBooked * daysBooked
//         : 0;
//     setBookingTotals(totalCost);
//   };

//   const handleAirbnbBooking = async () => {
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

//     const amountExpected =
//       selectedAirbnb && selectedAirbnb.cost
//         ? selectedAirbnb.cost * roomsBooked * daysBooked
//         : 0;

//     const bookingData = {
//       airbnb: selectedAirbnb.id,
//       booked_from: checkinDate,
//       booked_to: checkoutDate,
//       user: userId,
//       // amount_expected: amountExpected,
//       // days_booked: daysBooked,
//     };

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/bookings/book-an-airbnb/",
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
//         setSelectedAirbnb(null);
//         setShowBookingForm(false);
//       } else {
//         setBookingSuccess(false);
//         setBookingError("Failed to book the Airbnb. Please try again.");
//       }
//     } catch (error) {
//       setBookingSuccess(false);
//       setBookingError("Error booking the Airbnb. Please try again later.");
//       console.error("Error booking the Airbnb:", error);
//     }
//   };

//   const toggleBooking = () => {
//     setShowBookingForm(!showBookingForm);
//   };

//   return (
//     <div>
//       <Navbar />
//       <section className="accommodation_area section_gap">
//         <div className="container">
//           {airbnbData.length > 0 && (
//             <div className="row mb_30">
//               {airbnbData.map((airbnb) => (
//                 <div className="col-lg-12" key={airbnb.id}>
//                   <div className="accommodation_item text-center card rounded">
//                     <img
//                       className="card-img-top"
//                       src={airbnb.profile_image}
//                       alt={airbnb.name}
//                     />
//                     <div className="card-body">
//                       <h4 className="card-title">{airbnb.name}</h4>
//                       <p className="card-text">
//                         Location: {airbnb.location}, {airbnb.city},{" "}
//                         {airbnb.country}
//                       </p>
//                       <p className="card-text">Address: {airbnb.address}</p>
//                       <p className="card-text">
//                         Contact: {airbnb.contact_number}
//                       </p>
//                       <p className="card-text">Email: {airbnb.email}</p>
//                       <p className="card-text">Cost: KES.{airbnb.cost}/night</p>
//                       <p className="card-text">
//                         Approval Status: {airbnb.approval_status}
//                       </p>
//                       <p className="card-text">
//                         Pets Allowed: {airbnb.pets_allowed}
//                       </p>
//                       <p className="card-text">
//                         Smoking Allowed: {airbnb.smoking_allowed}
//                       </p>
//                       <button
//                         className="btn theme_btn button_hover"
//                         onClick={() => handleSubmit(airbnb)}
//                       >
//                         Book Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {showBookingForm && selectedAirbnb && (
//         <div className="booking_form_right">
//           <section className="hotel_booking_area mt-5">
//             <div className="container">
//               <div className="row hotel_booking_table">
//                 <div className="col-md-12">
//                   <div className="booking_table">
//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         handleAirbnbBooking();
//                       }}
//                     >
//                       <div className="form-group">
//                         <label htmlFor="checkIn">Check-In:</label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           placeholder="Arrival Date"
//                           value={checkinDate}
//                           onChange={(e) => {
//                             setCheckinDate(e.target.value);
//                             calculateTotals();
//                           }}
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
//                           onChange={(e) => {
//                             setCheckoutDate(e.target.value);
//                             calculateTotals();
//                           }}
//                           required
//                         />
//                       </div>
//                       {/* <div className="form-group">
//                         <label htmlFor="rooms">Rooms:</label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           placeholder="Number of Rooms"
//                           value={roomsBooked}
//                           onChange={(e) => {
//                             setRoomsBooked(e.target.value);
//                             calculateTotals();
//                           }}
//                           required
//                         />
//                       </div> */}

//                       {bookingTotals > 0 && (
//                         <div className="form-group">
//                           <p className="totals-text">
//                             Total Cost: KES.{bookingTotals}
//                           </p>
//                         </div>
//                       )}

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
//           <div className="error_message">Please log in to book Airbnb.</div>
//         )}
//         {bookingError && <div className="error_message">{bookingError}</div>}
//         {bookingSuccess && (
//           <div className="success_message">Airbnb booked successfully!</div>
//         )}
//       </div>

//       {airbnbImages.length > 0 && <RoomImages images={airbnbImages} />}

//       <Footer />
//     </div>
//   );
// };

// export default AirBnb;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoomImages from "./RoomImages";
import  { BACKEND_API_URL } from '../services/constants';

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
          setAirbnbData([data]); // Assuming the response is a single property
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
    // Check for conflicts between selected dates and booked dates
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
          {airbnbData.length > 0 && (
            <div className="row mb-4">
              {airbnbData.map((airbnb) => (
                <div className="col-md-6" key={airbnb.id}>
                  <div className="card mb-3">
                    {/* <img
                      className="card-img-top"
                      src={airbnb.profile_image}
                      alt={airbnb.name}
                    /> */}
                    <div className="card-body">
                      <h5 className="card-title">{airbnb.name}</h5>
                      <p className="card-text">
                        Location: {airbnb.location}, {airbnb.city},{" "}
                        {airbnb.country}
                      </p>
                      <p className="card-text">Cost: KES.{airbnb.cost}/night</p>
                      <button
                        className="btn theme_btn button_hover"
                        onClick={() => handleSubmit(airbnb)}
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
      {showBookingForm && selectedAirbnb && (
        <div className="booking_form_right">
          <section className="hotel_booking_area mt-5">
            <div className="container">
              <div className="row hotel_booking_table">
                <div className="col-md-9 offset-md-3">
                  <div className="boking_table">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAirbnbBooking();
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
          <div className="error_message">Please log in to book Airbnb.</div>
        )}
        {bookingError && <div className="error_message">{bookingError}</div>}
        {bookingSuccess && (
          <div className="success_message">
            Airbnb booked successfully! Check Your Mail for payment links
          </div>
        )}
      </div>
      {airbnbImages.length > 0 && <RoomImages images={airbnbImages} />}
      <Footer />
    </div>
  );
};

export default AirBnb;
