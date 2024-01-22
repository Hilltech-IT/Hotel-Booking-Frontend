import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";

const EventListing = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data
    fetch("http://127.0.0.1:8000/events/api/events/")
      .then((response) => response.json())
      .then((data) => setEvents(data.results))
      .catch((error) => console.error("Error fetching data:", error));
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
                    <p>Regular Price: ${event.regular_ticket_price}</p>
                    <a href="#" className="btn theme_btn button_hover">
                      Book Now
                    </a>
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
