import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.pk) {
      fetchUserData(user.pk);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

  return (
    <>
      <Navbar />
      <div className="whole-wrap">
        <div className="container">
          <div className="section-top-border">
            <h3 className="mb-30 title_color">User Information</h3>
            {userData ? (
              <div className="user-info">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <strong>ID:</strong> {userData.id}
                    </p>
                    <p className="mb-2">
                      <strong>Username:</strong> {userData.username}
                    </p>
                    <p className="mb-2">
                      <strong>Email:</strong> {userData.email}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <strong>First Name:</strong> {userData.first_name}
                    </p>
                    <p className="mb-2">
                      <strong>Last Name:</strong> {userData.last_name}
                    </p>
                  </div>
                </div>
                <h4 className="mt-3">Bookings:</h4>
                <div className="table-responsive">
                  <table className="table table-bordered mt-2">
                    <thead>
                      <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Booked from</th>
                        {/* Add more columns as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {userData.bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>{booking.id}</td>
                          <td>{booking.booked_from}</td>
                          {/* Add more columns as needed */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
