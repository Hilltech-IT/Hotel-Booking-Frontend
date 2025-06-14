import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_API_URL } from "../services/constants";

const EventTicket = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    regular_tickets: 0,
    vip_tickets: 0,
    vvip_tickets: 0,
    children_tickets: 0,
    couples_tickets: 0,
    group_tickets: 0,
    students_tickets: 0,
    ticket_type: "Multiple",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    payment_method: "Mpesa",
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `${BACKEND_API_URL}/events/api/events/${eventId}`
        );
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
        } else {
          setError("Failed to fetch event details");
        }
      } catch (error) {
        setError("Error fetching event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.pk) {
      fetchUserData(user.token);
      setToken(user.token);
    }
  }, [eventId]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const storedUser = await response.json();
        setUser(storedUser);
        setFormData((prevData) => ({
          ...prevData,
          first_name: storedUser.first_name,
          last_name: storedUser.last_name,
          phone_number: storedUser.phone_number,
          email: storedUser.email,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleTicketChange = (type, value) => {
    const numValue = parseInt(value, 10) || 0;
    setFormData((prevData) => ({
      ...prevData,
      [`${type}_tickets`]: numValue,
    }));
  };

  const calculateTotalPrice = () => {
    if (!event) return 0;

    const ticketTypes = [
      { type: "regular", price: event.regular_ticket_price },
      { type: "vip", price: event.vip_ticket_price },
      { type: "vvip", price: event.vvip_ticket_price },
      { type: "children", price: event.children_ticket_price },
      { type: "couples", price: event.couples_ticket_price },
      { type: "group", price: event.group_ticket_price },
      { type: "students", price: event.students_ticket_price },
    ];

    return ticketTypes.reduce((total, { type, price }) => {
      return total + (formData[`${type}_tickets`] * price);
    }, 0);
  };

  const resetForm = () => {
    setFormData({
      regular_tickets: 0,
      vip_tickets: 0,
      vvip_tickets: 0,
      children_tickets: 0,
      couples_tickets: 0,
      group_tickets: 0,
      students_tickets: 0,
      ticket_type: "Multiple",
      payment_method: "Mpesa",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = calculateTotalPrice();
    
    if (totalPrice <= 0) {
      alert("Please add at least one ticket to your purchase.");
      return;
    }

    if (!user) {
      alert("Please log in before purchasing.");
      return;
    }

    if (event && event.total_tickets === 0) {
      alert("Sorry, tickets for this event are sold out.");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_API_URL}/events/buy-event-ticket/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            event: eventId,
            ...formData,
          }),
        }
      );
      
      if (response.ok) {
        alert("Ticket purchase successful! Check Mail for Payment Link");
        navigate("/");
        resetForm();
      } else {
        const errorData = await response.json();
        alert(`Failed to purchase ticket: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("An error occurred while processing your request.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Event Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{event.title}</h1>
            {user && (
              <p className="text-gray-600 mt-2">
                Welcome, {user.first_name} {user.last_name}!
              </p>
            )}
          </div>

          {/* Ticket Form */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        Regular Tickets (${event.regular_ticket_price})
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.regular_tickets}
                        onChange={(e) => handleTicketChange("regular", e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        VIP Tickets (${event.vip_ticket_price})
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.vip_tickets}
                        onChange={(e) => handleTicketChange("vip", e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        VVIP Tickets (${event.vvip_ticket_price})
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.vvip_tickets}
                        onChange={(e) => handleTicketChange("vvip", e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        Students Tickets (${event.students_ticket_price})
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.students_tickets}
                        onChange={(e) => handleTicketChange("students", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        Children Tickets (${event.children_ticket_price})
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.children_tickets}
                        onChange={(e) => handleTicketChange("children", e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        Couples Tickets (${event.couples_ticket_price})
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.couples_tickets}
                        onChange={(e) => handleTicketChange("couples", e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        Group Tickets (${event.group_ticket_price})
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.group_tickets}
                        onChange={(e) => handleTicketChange("group", e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label className="block text-gray-700 font-medium mb-2">
                        Ticket Type
                      </label>
                      <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={formData.ticket_type}
                        onChange={(e) =>
                          setFormData({ ...formData, ticket_type: e.target.value })
                        }
                      >
                        <option value="Single">Single</option>
                        <option value="Multiple">Multiple</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Ticket Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Ticket Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { type: "regular", label: "Regular" },
                      { type: "vip", label: "VIP" },
                      { type: "vvip", label: "VVIP" },
                      { type: "children", label: "Children" },
                      { type: "couples", label: "Couples" },
                      { type: "group", label: "Group" },
                      { type: "students", label: "Students" },
                    ].map(({ type, label }) => (
                      formData[`${type}_tickets`] > 0 && (
                        <div key={type} className="bg-white p-3 rounded-lg shadow-sm">
                          <p className="font-medium text-gray-700">{label} Tickets:</p>
                          <p className="text-gray-600">
                            {formData[`${type}_tickets`]} × ${event[`${type}_ticket_price`]} = 
                            <span className="font-semibold ml-1">
                              ${formData[`${type}_tickets`] * event[`${type}_ticket_price`]}
                            </span>
                          </p>
                        </div>
                      )
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xl font-bold text-gray-800">
                      Total Price: <span className="text-purple-600">${calculateTotalPrice()}</span>
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition duration-300"
                  >
                    Purchase Tickets
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventTicket;
