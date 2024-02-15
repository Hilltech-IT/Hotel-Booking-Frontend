import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EventTicket = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
          `http://127.0.0.1:8000/events/api/events/${eventId}`
        );
        if (response.ok) {
          const eventData = await response.json();
          setEvent(eventData);
        } else {
          console.error("Failed to fetch event details");
        }
      } catch (error) {
        console.error("Error occurred while fetching event details:", error);
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
      const response = await fetch(`http://34.171.61.167:8000/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
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
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error occurred while fetching user data:", error);
    }
  };

  const handleTicketChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${type}_tickets`]: value,
    }));
  };

  const calculateTotalPrice = () => {
    if (!event) {
      return 0;
    }

    const {
      regular_ticket_price,
      vip_ticket_price,
      vvip_ticket_price,
      children_ticket_price,
      couples_ticket_price,
      group_ticket_price,
      students_ticket_price,
    } = event;
    const {
      regular_tickets,
      vip_tickets,
      vvip_tickets,
      children_tickets,
      couples_tickets,
      group_tickets,
      students_tickets,
    } = formData;

    const totalRegularPrice = regular_tickets * regular_ticket_price;
    const totalVipPrice = vip_tickets * vip_ticket_price;
    const totalVvipPrice = vvip_tickets * vvip_ticket_price;
    const totalChildrenPrice = children_tickets * children_ticket_price;
    const totalCouplesPrice = couples_tickets * couples_ticket_price;
    const totalGroupPrice = group_tickets * group_ticket_price;
    const totalStudentsPrice = students_tickets * students_ticket_price;

    const totalPrice =
      totalRegularPrice +
      totalVipPrice +
      totalVvipPrice +
      totalChildrenPrice +
      totalCouplesPrice +
      totalGroupPrice +
      totalStudentsPrice;

    return totalPrice;
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
        "http://127.0.0.1:8000/events/buy-event-ticket/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            event: eventId,
            ...formData,
          }),
        }
      );
      if (response.ok) {
        console.log("Ticket purchase successful!");
        alert("Ticket purchase successful! Check Mail for Payment Link");
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Failed to purchase ticket:", errorData);
        alert(`Failed to purchase ticket: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error occurred while purchasing ticket:", error);
      alert(
        "An error occurred while processing your request. Please try again later."
      );
    }
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <section className="accommodation_area section_gap">
        <div className="container">
          <div className="booking-form">
            <h2>{event.title}</h2>
            {user && (
              <p>
                Welcome, {user.first_name} {user.last_name}!
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="regular_tickets">Regular Tickets:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="regular_tickets"
                      name="regular_tickets"
                      value={formData.regular_tickets}
                      onChange={(e) =>
                        handleTicketChange(
                          "regular",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="vip_tickets">VIP Tickets:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="vip_tickets"
                      name="vip_tickets"
                      value={formData.vip_tickets}
                      onChange={(e) =>
                        handleTicketChange("vip", parseInt(e.target.value, 10))
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="vvip_tickets">VVIP Tickets:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="vvip_tickets"
                      name="vvip_tickets"
                      value={formData.vvip_tickets}
                      onChange={(e) =>
                        handleTicketChange("vvip", parseInt(e.target.value, 10))
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="students_tickets">Students Tickets:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="students_tickets"
                      name="students_tickets"
                      value={formData.students_tickets}
                      onChange={(e) =>
                        handleTicketChange(
                          "students",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="children_tickets">Children Tickets:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="children_tickets"
                      name="children_tickets"
                      value={formData.children_tickets}
                      onChange={(e) =>
                        handleTicketChange(
                          "children",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="couples_tickets">Couples Tickets:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="couples_tickets"
                      name="couples_tickets"
                      value={formData.couples_tickets}
                      onChange={(e) =>
                        handleTicketChange(
                          "couples",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="group_tickets">Group Tickets:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="group_tickets"
                      name="group_tickets"
                      value={formData.group_tickets}
                      onChange={(e) =>
                        handleTicketChange(
                          "group",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ticket_type">Ticket Type:</label>
                <select
                  className="form-control"
                  id="ticket_type"
                  name="ticket_type"
                  value={formData.ticket_type}
                  onChange={(e) =>
                    setFormData({ ...formData, ticket_type: e.target.value })
                  }
                >
                  <option value="Single">Single</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>

              <div className="ticket-summary">
                <h3>Ticket Summary</h3>
                {Object.keys(formData).map((ticketType) =>
                  ticketType.endsWith("_tickets") ? (
                    <p key={ticketType}>
                      {`${ticketType
                        .replace("_tickets", "")
                        .charAt(0)
                        .toUpperCase()}${ticketType
                        .replace("_tickets", "")
                        .slice(1)} Tickets: ${formData[ticketType]}`}
                    </p>
                  ) : null
                )}
                <p>Total Price: ${calculateTotalPrice()}</p>
              </div>

              <button type="submit" className="btn btn-primary">
                Purchase Tickets
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventTicket;
