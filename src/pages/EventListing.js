// // EventListing.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";

// const EventListing = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Fetch events data
//     fetch("http://127.0.0.1:8000/events/api/events/")
//       .then((response) => response.json())
//       .then((data) => setEvents(data.results))
//       .catch((error) => console.error("Error fetching events:", error));
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <section className="accomodation_area section_gap">
//         <div className="container">
//           <div className="section_title text-center">
//             <h2 className="title_color">Upcoming Events</h2>
//             <p>
//               We all live in an age that belongs to the young at heart. Life
//               that is becoming extremely fast.
//             </p>
//           </div>
//           <div className="row">
//             {events.map((event) => (
//               <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
//                 <div className="card" style={{ height: "100%" }}>
//                   <div className="card-body" style={{ height: "100%" }}>
//                     <h5 className="card-title">{event.title}</h5>
//                     <p className="card-text">{event.description}</p>
//                     <p>
//                       Date: {event.event_date} Time: {event.event_time}
//                     </p>
//                     <p>Location: {event.location}</p>
//                     <p>Regular Price: ${event.regular_ticket_price}</p>
//                     <p>VIP Price: ${event.vip_ticket_price}</p>
//                     <p>VVIP Price: ${event.vvip_ticket_price}</p>
//                     <p>Children Price: ${event.children_ticket_price}</p>
//                     {/* Add similar lines for other ticket types */}
//                     <Link className="btn theme_btn button_hover">
//                       Book Tickets
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default EventListing;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EventListing = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data
    fetch("http://127.0.0.1:8000/events/api/events/")
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <>
      <Navbar />
      <section className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Upcoming Events</h2>
            <p>
              We all live in an age that belongs to the young at heart. Life
              that is becoming extremely fast.
            </p>
          </div>
          <div className="row">
            {events.map((event) => (
              <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body" style={{ height: "100%" }}>
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{event.description}</p>
                    <p>
                      Date: {event.event_date} Time: {event.event_time}
                    </p>
                    <p>Location: {event.location}</p>
                    <p>Tickets: {event.total_tickets}</p>
                    <p>Regular Price: ${event.regular_ticket_price}</p>
                    <p>VIP Price: ${event.vip_ticket_price}</p>
                    <p>VVIP Price: ${event.vvip_ticket_price}</p>
                    <p>Children Price: ${event.children_ticket_price}</p>
                    <Link
                      to={`/events/${event.id}`}
                      className="btn theme_btn button_hover"
                    >
                      Book Tickets
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventListing;
