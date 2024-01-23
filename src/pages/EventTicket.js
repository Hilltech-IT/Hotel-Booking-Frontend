// EventTicket.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EventTicket = () => {
  const [eventTickets, setEventTickets] = useState([]);
  const { eventId } = useParams();
  console.log("Event ID:", eventId);

  useEffect(() => {
    // Fetch tickets for the specified event
    fetch(`http://127.0.0.1:8000/events/api/event-tickets/?event=${eventId}`)
      .then((response) => response.json())
      .then((data) => setEventTickets(data.results))
      .catch((error) => console.error("Error fetching event tickets:", error));
  }, [eventId]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="section_title text-center">
          <h2 className="title_color">Tickets for Event</h2>
        </div>
        <div className="row">
          {eventTickets.map((ticket) => (
            <div className="col-lg-4 col-md-6 mb-4" key={ticket.id}>
              <div className="card" style={{ height: "100%" }}>
                <div className="card-body" style={{ height: "100%" }}>
                  <h5 className="card-title">{ticket.ticket_type} Ticket</h5>
                  <p>Amount Expected: ${ticket.amount_expected}</p>
                  {/* Additional ticket details can be added here */}
                  <button className="btn theme_btn button_hover">
                    Book Ticket
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Add a form or button here for booking a new ticket */}
      </div>
      <Footer />
    </>
  );
};

export default EventTicket;
