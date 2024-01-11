// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Account = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     if (user && user.pk) {
//       fetchUserData(user.pk);
//     }
//   }, []);

//   const fetchUserData = async (userId) => {
//     try {
//       const response = await fetch(`http://34.171.61.167:8000/users/${userId}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
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

//   return (
//     <>
//       <Navbar />
//       <div className="whole-wrap">
//         <div className="container">
//           <div className="section-top-border">
//             <h3 className="mb-30 title_color">User Information</h3>
//             {userData ? (
//               <div className="user-info">
//                 <div className="row">
//                   <div className="col-md-6">
//                     <p className="mb-2">
//                       <strong>Username:</strong> {userData.username}
//                     </p>
//                     <p className="mb-2">
//                       <strong>Email:</strong> {userData.email}
//                     </p>
//                     <p className="mb-2">
//                       <strong>First Name:</strong> {userData.first_name}
//                     </p>
//                   </div>
//                   <div className="col-md-6">
//                     <p className="mb-2">
//                       <strong>Role:</strong> {userData.role}
//                     </p>
//                     <p className="mb-2">
//                       <strong>Last Name:</strong> {userData.last_name}
//                     </p>
//                     <p className="mb-2">
//                       <strong>Phone Number:</strong> {userData.phone_number}
//                     </p>
//                   </div>
//                 </div>
//                 <h4 className="mt-3">Bookings:</h4>
//                 <div className="table-responsive">
//                   <table className="table table-bordered mt-2">
//                     <thead>
//                       <tr>
//                         <th scope="col">Booking ID</th>
//                         <th scope="col">Booked from</th>
//                         <th scope="col">Booked to</th>
//                         <th scope="col">Amount Expected</th>
//                         <th scope="col">Amount Paid</th>
//                         {/* Add more columns as needed */}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {userData.bookings.map((booking) => (
//                         <tr key={booking.id}>
//                           <td>{booking.id}</td>
//                           <td>{booking.booked_from}</td>
//                           <td>{booking.booked_to}</td>
//                           <td>{booking.amount_expected}</td>
//                           <td>{booking.amount_paid}</td>
//                           {/* Add more columns as needed */}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
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

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust the number of items per page as needed

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.pk) {
      fetchUserData(user.pk);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `http://34.171.61.167:8000/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
  const currentBookings = userData?.bookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="whole-wrap">
        <div className="container">
          <div className="section-top-border">
            {userData ? (
              <div>
                <h3 className="mb-30 title_color">User Information</h3>
                <div className="user-info">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong>Username:</strong> {userData.username}
                      </p>
                      <p className="mb-2">
                        <strong>Email:</strong> {userData.email}
                      </p>
                      <p className="mb-2">
                        <strong>First Name:</strong> {userData.first_name}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-2">
                        <strong>Role:</strong> {userData.role}
                      </p>
                      <p className="mb-2">
                        <strong>Last Name:</strong> {userData.last_name}
                      </p>
                      <p className="mb-2">
                        <strong>Phone Number:</strong> {userData.phone_number}
                      </p>
                    </div>
                  </div>
                </div>
                <h4 className="mt-3">Bookings:</h4>
                <div className="table-responsive">
                  <table className="table table-bordered mt-2">
                    <thead>
                      <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Booked from</th>
                        <th scope="col">Booked to</th>
                        <th scope="col">Amount Expected</th>
                        <th scope="col">Amount Paid</th>
                        {/* Add more columns as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>{booking.id}</td>
                          <td>{booking.booked_from}</td>
                          <td>{booking.booked_to}</td>
                          <td>{booking.amount_expected}</td>
                          <td>{booking.amount_paid}</td>
                          {/* Add more columns as needed */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                    {[
                      ...Array(
                        Math.ceil(userData.bookings.length / itemsPerPage)
                      ),
                    ].map((item, index) => (
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
                    ))}
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
              </div>
            ) : (
              <div>No user information found or data is still loading...</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
