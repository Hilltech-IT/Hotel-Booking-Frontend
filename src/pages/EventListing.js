import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Change this value based on your desired items per page

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
    <>
      <Navbar />
      <section className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h3 className="title_color text-left">All events</h3>
          </div>
          <div className="row">
            {currentEvents.map((event) => (
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
                    <p>Children Price: ${event.students_ticket_price}</p>
                    <p>Children Price: ${event.group_ticket_price}</p>
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
          {[...Array(Math.ceil(events.length / itemsPerPage))].map(
            (item, index) => (
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
            )
          )}
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

      <Footer />
    </>
  );
};

export default EventListing;
