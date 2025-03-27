
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import RoomImages from "./RoomImages";
// import  { BACKEND_API_URL } from '../services/constants';

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
//           `${BACKEND_API_URL}/properties/api/property-listings/${propertyId}/`
//         );
//         const data = await response.json();
//         if (data) {
//           setAirbnbData([data]); 
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

//   const getDatesBetween = (startDate, endDate) => {
//     const dates = [];
//     let currentDate = new Date(startDate);

//     while (currentDate <= new Date(endDate)) {
//       dates.push(currentDate.toISOString().split("T")[0]);
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return dates;
//   };

//   const handleAirbnbBooking = async () => {
//     // Check for conflicts between selected dates and booked dates
//     const selectedAirbnbBookedDates = selectedAirbnb.booked_dates || [];
//     const selectedDates = getDatesBetween(checkinDate, checkoutDate);
//     const conflictingDate = selectedDates.find((date) =>
//       selectedAirbnbBookedDates.includes(date)
//     );

//     if (conflictingDate) {
//       alert(
//         `Sorry, ${conflictingDate} is already booked. Please choose a different date.`
//       );
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

//     const amountExpected =
//       selectedAirbnb && selectedAirbnb.cost
//         ? selectedAirbnb.cost * roomsBooked * daysBooked
//         : 0;

//     const bookingData = {
//       airbnb: selectedAirbnb.id,
//       booked_from: checkinDate,
//       booked_to: checkoutDate,
//       user: userId,
//     };

//     try {
//       const response = await fetch(
//         `${BACKEND_API_URL}/bookings/book-an-airbnb/`,
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
//       <section className="accommodation_area section_gap">
//         <div className="container">
//           {airbnbData.length > 0 && (
//             <div className="row mb-4">
//               {airbnbData.map((airbnb) => (
//                 <div className="col-md-6" key={airbnb.id}>
//                   <div className="card mb-3">
//                     {/* <img
//                       className="card-img-top"
//                       src={airbnb.profile_image}
//                       alt={airbnb.name}
//                     /> */}
//                     <div className="card-body">
//                       <h5 className="card-title">{airbnb.name}</h5>
//                       <p className="card-text">
//                         Location: {airbnb.location}, {airbnb.city},{" "}
//                         {airbnb.country}
//                       </p>
//                       <p className="card-text">Cost: KES.{airbnb.cost}/night</p>
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
//                 <div className="col-md-9 offset-md-3">
//                   <div className="boking_table">
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
//                           value={checkinDate}
//                           onChange={(e) => {
//                             setCheckinDate(e.target.value);
//                             calculateTotals();
//                           }}
//                           min={getCurrentDate()}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="checkOut">Check-Out:</label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           value={checkoutDate}
//                           onChange={(e) => {
//                             setCheckoutDate(e.target.value);
//                             calculateTotals();
//                           }}
//                           min={getCurrentDate()}
//                           required
//                         />
//                       </div>

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
//                           style={{ marginRight: "10px" }}
//                         >
//                           Book Now
//                         </button>

//                         {/* Close Button */}
//                         <button
//                           type="button"
//                           className="btn btn-danger mt-2"
//                           onClick={() => setShowBookingForm(false)}
//                         >
//                           Close
//                         </button>
//                       </div>
//                     </form>
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
//           <div className="success_message">
//             Airbnb booked successfully! Check Your Mail for payment links
//           </div>
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <section className="py-8">
        <div className="container mx-auto px-4">
          {airbnbData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {airbnbData.map((airbnb) => (
                <div key={airbnb.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    src={airbnb.profile_image}
                    alt={airbnb.name}
                  />
                  <div className="p-6">
                    <h5 className="text-xl font-bold mb-2">{airbnb.name}</h5>
                    <p className="text-gray-600 mb-2">
                      Location: {airbnb.location}, {airbnb.city}, {airbnb.country}
                    </p>
                    <p className="text-gray-800 font-bold">
                      Cost: KES {airbnb.cost}/night
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Book {selectedAirbnb.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAirbnbBooking();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Check-In:
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={checkinDate}
                  onChange={(e) => {
                    setCheckinDate(e.target.value);
                    calculateTotals();
                  }}
                  min={getCurrentDate()}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Check-Out:
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  <p className="text-lg font-semibold">
                    Total Cost: KES {bookingTotals}
                  </p>
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Book Now
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
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
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
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