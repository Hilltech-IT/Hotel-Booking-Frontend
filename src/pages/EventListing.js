
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/events/api/events/`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(events.length / itemsPerPage));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="py-8 flex-grow">
        {/* Adjusted container width for better balance */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 mx-auto max-w-3xl">
            <h3 className="text-3xl font-bold text-gray-800">All Events</h3>
            <p className="text-gray-600 mt-2">
              Discover exciting events happening near you
            </p>
          </div>

          {events.length > 0 ? (
            <>
              {/* Adjusted grid with better horizontal spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-4 sm:mx-0">
                {currentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Event Image */}
                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Event+Image';
                            e.target.className = "w-full h-full object-contain bg-gray-100 p-4";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
                          <span className="text-white text-lg">Event Image</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex-grow">
                      <h5 className="text-xl font-bold mb-2 text-gray-800">
                        {event.title}
                      </h5>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{event.event_time}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <h6 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <svg className="w-4 h-4 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Ticket Prices
                        </h6>
                        <ul className="space-y-1 text-sm">
                          {event.regular_ticket_price && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Regular:</span>
                              <span className="font-medium">${event.regular_ticket_price}</span>
                            </li>
                          )}
                          {event.vip_ticket_price && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">VIP:</span>
                              <span className="font-medium">${event.vip_ticket_price}</span>
                            </li>
                          )}
                          {event.vvip_ticket_price && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">VVIP:</span>
                              <span className="font-medium">${event.vvip_ticket_price}</span>
                            </li>
                          )}
                          {event.students_ticket_price && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Students:</span>
                              <span className="font-medium">${event.students_ticket_price}</span>
                            </li>
                          )}
                          {event.group_ticket_price && (
                            <li className="flex justify-between">
                              <span className="text-gray-600">Group:</span>
                              <span className="font-medium">${event.group_ticket_price}</span>
                            </li>
                          )}
                        </ul>
                      </div>

                      <Link
                        to={`/events/${event.id}`}
                        className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition duration-300 flex items-center justify-center text-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        Book Tickets
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination with better centering */}
              <div className="mt-8 flex flex-col items-center px-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      } else {
                        alert("You're on the first page");
                      }
                    }}
                    className="px-4 py-2 bg-white border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition duration-300 text-sm"
                  >
                    Previous
                  </button>
                  
                  <span className="text-gray-700 font-medium text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      } else {
                        alert("No more events to show");
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 text-sm"
                  >
                    Next
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Showing {Math.min(indexOfFirstItem + 1, events.length)} to{' '}
                  {Math.min(indexOfLastItem, events.length)} of{' '}
                  {events.length} events
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm max-w-md mx-auto px-6">
              <svg className="w-14 h-14 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h4 className="text-lg text-gray-700 mb-2">No events available</h4>
              <p className="text-gray-500 text-sm mb-4">Check back later for upcoming events</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 text-sm"
              >
                Refresh Events
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventListing;