// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import {BACKEND_API_URL } from '../services/constants';

// const Account = () => {
//   const [userData, setUserData] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5); // Adjust the number of items per page as needed

//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     if (user && user.pk) {
//       fetchUserData(user.token);
//     }
//   }, []);

//   const fetchUserData = async (token) => {
//     try {
//       const response = await fetch(`${BACKEND_API_URL}/users/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`,
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUserData(userData);
//       } else {
//         console.error("Failed to fetch user data");
//       }
//     } catch (error) {
//       console.error("Error occurred while fetching user data:", error);
//     }
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentBookings =
//     userData?.hotel_bookings?.slice(indexOfFirstItem, indexOfLastItem) || [];

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <Navbar />
//       <div className="whole-wrap">
//         <div className="container">
//           <h4>User Information</h4>
//           <div className="section-top-border">
//             {userData ? (
//               <div>
//                 <h3 className="mb-30 title_color">User Information</h3>
//                 <div className="user-info">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <p className="mb-2">
//                         <strong>Username:</strong> {userData.username}
//                       </p>
//                       <p className="mb-2">
//                         <strong>Email:</strong> {userData.email}
//                       </p>
//                       <p className="mb-2">
//                         <strong>First Name:</strong> {userData.first_name}
//                       </p>
//                     </div>
//                     <div className="col-md-6">
//                       <p className="mb-2">
//                         <strong>Role:</strong> {userData.role}
//                       </p>
//                       <p className="mb-2">
//                         <strong>Last Name:</strong> {userData.last_name}
//                       </p>
//                       <p className="mb-2">
//                         <strong>Phone Number:</strong> {userData.phone_number}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <h4 className="mt-3">Bookings:</h4>
//                 {currentBookings.length > 0 ? (
//                   <div className="table-responsive">
//                     <table className="table table-bordered mt-2">
//                       <thead>
//                         <tr>
//                           <th scope="col">Booking ID</th>
//                           <th scope="col">Booked from</th>
//                           <th scope="col">Booked to</th>
//                           <th scope="col">Amount Expected</th>
//                           <th scope="col">Amount Paid</th>
//                           {/* Add more columns as needed */}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentBookings.map((booking) => (
//                           <tr key={booking.id}>
//                             <td>{booking.id}</td>
//                             <td>{booking.booked_from}</td>
//                             <td>{booking.booked_to}</td>
//                             <td>{booking.amount_expected}</td>
//                             <td>{booking.amount_paid}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div>No bookings found.</div>
//                 )}
//                 {/* Pagination */}
//                 <nav className="blog-pagination justify-content-center d-flex">
//                   <ul className="pagination">
//                     <li className="page-item">
//                       <a
//                         href="#"
//                         className="page-link"
//                         aria-label="Previous"
//                         onClick={() => paginate(currentPage - 1)}
//                       >
//                         <span aria-hidden="true">
//                           <span className="lnr lnr-chevron-left"></span>
//                         </span>
//                       </a>
//                     </li>
//                     {userData && userData.bookings
//                       ? [
//                           ...Array(
//                             Math.ceil(
//                               (userData.bookings.length || 0) / itemsPerPage
//                             )
//                           ),
//                         ].map((item, index) => (
//                           <li
//                             key={index}
//                             className={`page-item ${
//                               currentPage === index + 1 ? "active" : ""
//                             }`}
//                           >
//                             <a
//                               href="#"
//                               className="page-link"
//                               onClick={() => paginate(index + 1)}
//                             >
//                               {index + 1}
//                             </a>
//                           </li>
//                         ))
//                       : null}
//                     <li className="page-item">
//                       <a
//                         href="#"
//                         className="page-link"
//                         aria-label="Next"
//                         onClick={() => paginate(currentPage + 1)}
//                       >
//                         <span aria-hidden="true">
//                           <span className="lnr lnr-chevron-right"></span>
//                         </span>
//                       </a>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             ) : (
//               <div>No user information found or data is still loading...</div>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Account;
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust the number of items per page as needed

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.pk) {
      fetchUserData(user.token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings =
    userData?.hotel_bookings?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h4 className="text-2xl font-bold mb-6">User Information</h4>
          <div className="bg-white rounded-lg shadow-md p-6">
            {userData ? (
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2">
                      <strong className="text-gray-700">Username:</strong>{" "}
                      <span className="text-gray-600">{userData.username}</span>
                    </p>
                    <p className="mb-2">
                      <strong className="text-gray-700">Email:</strong>{" "}
                      <span className="text-gray-600">{userData.email}</span>
                    </p>
                    <p className="mb-2">
                      <strong className="text-gray-700">First Name:</strong>{" "}
                      <span className="text-gray-600">{userData.first_name}</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <strong className="text-gray-700">Role:</strong>{" "}
                      <span className="text-gray-600">{userData.role}</span>
                    </p>
                    <p className="mb-2">
                      <strong className="text-gray-700">Last Name:</strong>{" "}
                      <span className="text-gray-600">{userData.last_name}</span>
                    </p>
                    <p className="mb-2">
                      <strong className="text-gray-700">Phone Number:</strong>{" "}
                      <span className="text-gray-600">{userData.phone_number}</span>
                    </p>
                  </div>
                </div>
                <h4 className="text-xl font-bold mt-6 mb-4 text-gray-800">
                  Bookings:
                </h4>
                {currentBookings.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Booking ID
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Booked From
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Booked To
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Amount Expected
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                            Amount Paid
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {booking.id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {booking.booked_from}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {booking.booked_to}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {booking.amount_expected}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                              {booking.amount_paid}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-600">No bookings found.</div>
                )}
                {/* Pagination */}
                <nav className="flex justify-center mt-6">
                  <ul className="flex space-x-2">
                    <li>
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
                      >
                        Previous
                      </button>
                    </li>
                    {userData && userData.hotel_bookings
                      ? [
                          ...Array(
                            Math.ceil(
                              (userData.hotel_bookings.length || 0) / itemsPerPage
                            )
                          ),
                        ].map((item, index) => (
                          <li key={index}>
                            <button
                              onClick={() => paginate(index + 1)}
                              className={`px-3 py-1 ${
                                currentPage === index + 1
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-200 text-gray-700"
                              } rounded-lg hover:bg-purple-700 hover:text-white`}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))
                      : null}
                    <li>
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={
                          currentPage ===
                          Math.ceil(
                            (userData?.hotel_bookings?.length || 0) / itemsPerPage
                          )
                        }
                        className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            ) : (
              <div className="text-gray-600">
                No user information found or data is still loading...
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;