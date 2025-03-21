// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { BACKEND_API_URL } from "../services/constants";

// const EventListing = () => {
//   const [events, setEvents] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(4); 

//   useEffect(() => {
//     // Fetch events data
//     fetch(`${BACKEND_API_URL}/events/api/events/`)
//       .then((response) => response.json())
//       .then((data) => setEvents(data.results))
//       .catch((error) => console.error("Error fetching events:", error));
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <Navbar />
//       <section className="accomodation_area section_gap">
//         <div className="container">
//           <div className="section_title text-center">
//             <h3 className="title_color text-left">All events</h3>
//           </div>
//           <div className="row">
//             {currentEvents.map((event) => (
//               <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
//                 <div className="card" style={{ height: "100%" }}>
//                   <div className="card-body" style={{ height: "100%" }}>
//                     <h5 className="card-title">{event.title}</h5>
//                     <p className="card-text">{event.description}</p>
//                     <p>
//                       Date: {event.event_date} Time: {event.event_time}
//                     </p>
//                     <p>Location: {event.location}</p>
//                     <p>Tickets: {event.total_tickets}</p>
//                     <p>Regular Price: ${event.regular_ticket_price}</p>
//                     <p>VIP Price: ${event.vip_ticket_price}</p>
//                     <p>VVIP Price: ${event.vvip_ticket_price}</p>
//                     <p>Children Price: ${event.students_ticket_price}</p>
//                     <p>Children Price: ${event.group_ticket_price}</p>
//                     <Link
//                       to={`/events/${event.id}`}
//                       className="btn theme_btn button_hover"
//                     >
//                       Book Tickets
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
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
//           {[...Array(Math.ceil(events.length / itemsPerPage))].map(
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

//       <Footer />
//     </>
//   );
// };

// export default EventListing;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  useEffect(() => {
    // Fetch events data
    fetch(`${BACKEND_API_URL}/events/api/events/`)
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Events Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800">All Events</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all duration-300"
              >
                <div className="p-6">
                  <h5 className="text-xl font-semibold mb-2">{event.title}</h5>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span> {event.event_date}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Time:</span> {event.event_time}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Tickets:</span> {event.total_tickets}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Regular Price:</span> ${event.regular_ticket_price}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">VIP Price:</span> ${event.vip_ticket_price}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">VVIP Price:</span> ${event.vvip_ticket_price}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Children Price:</span> ${event.students_ticket_price}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Group Price:</span> ${event.group_ticket_price}
                  </p>
                  <Link
                    to={`/events/${event.id}`}
                    className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 block text-center"
                  >
                    Book Tickets
                  </Link>
                </div>
              </div>
            ))}
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
          {[...Array(Math.ceil(events.length / itemsPerPage))].map(
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
                currentPage === Math.ceil(events.length / itemsPerPage)
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EventListing;