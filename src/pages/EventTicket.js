// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const EventTicket = () => {
//   const { eventId } = useParams();
//   const [event, setEvent] = useState(null);
//   const [user, setUser] = useState(null);

//   const [formData, setFormData] = useState({
//     email: "",
//     first_name: "",
//     last_name: "",
//     phone_number: "",
//     regular_tickets: 0,
//     vip_tickets: 0,
//     vvip_tickets: 0,
//     children_tickets: 0,
//     couples_tickets: 0,
//     group_tickets: 0,
//     students_tickets: 0,
//     ticket_type: "Single", // Set a default value
//     payment_method: "Credit Card", // Set a default value
//   });

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/events/api/events/${eventId}`
//         );
//         if (response.ok) {
//           const eventData = await response.json();
//           setEvent(eventData);
//         } else {
//           console.error("Failed to fetch event details");
//         }
//       } catch (error) {
//         console.error("Error occurred while fetching event details:", error);
//       }
//     };

//     // Fetch event details based on the eventId
//     fetchEventDetails();

//     // Retrieve user details from session storage
//     const storedUser = JSON.parse(sessionStorage.getItem("user"));
//     setUser(storedUser);

//     // Prefill the form data with user details
//     if (storedUser) {
//       setFormData((prevData) => ({
//         ...prevData,
//         email: storedUser.email,
//         first_name: storedUser.first_name,
//         last_name: storedUser.last_name,
//         phone_number: storedUser.phone_number,
//       }));
//     }
//   }, [eventId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Perform the API call to save the form data to the database
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/events/buy-event-ticket/",
//         {
//           method: "POST",
//           headers: {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Token ${formData.token}`,
//             },
//           },
//           body: JSON.stringify({
//             event: eventId,
//             ...formData,
//           }),
//         }
//       );

//       if (response.ok) {
//         // Handle success, e.g., show a success message
//         console.log("Ticket purchase successful!");
//       } else {
//         // Handle error, e.g., show an error message
//         console.error("Failed to purchase ticket");
//       }
//     } catch (error) {
//       console.error("Error occurred while purchasing ticket:", error);
//     }
//   };

//   if (!event || !user) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <Navbar />
//       <section className="ticket_booking_area section_gap">
//         <div className="container">
//           <h2>{event.title}</h2>
//           <p>
//             Welcome, {user.first_name} {user.last_name}!
//           </p>
//           <form onSubmit={handleSubmit}>
//             {/* Add form elements to select ticket type and quantity */}
//             <label>Email:</label>
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               readOnly
//             />
//             {/* Add similar input fields for other user details */}
//             <label>Regular Tickets:</label>
//             <input
//               type="number"
//               name="regular_tickets"
//               value={formData.regular_tickets}
//               onChange={handleInputChange}
//             />
//             {/* Add similar input fields for other ticket types */}
//             <label>Ticket Type:</label>
//             <select
//               name="ticket_type"
//               value={formData.ticket_type}
//               onChange={handleInputChange}
//             >
//               <option value="Single">Single</option>
//               <option value="Multiple">Multiple</option>
//               {/* Add options for other ticket types */}
//             </select>
//             {/* Add a button to proceed with the purchase */}
//             <button type="submit">Purchase Tickets</button>
//           </form>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default EventTicket;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EventTicket = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    tickets: {
      regular: 0,
      vip: 0,
      vvip: 0,
      children: 0,
      couples: 0,
      group: 0,
      students: 0,
    },
    ticket_type: "Single",
    payment_method: "Credit Card",
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

    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      setFormData((prevData) => ({
        ...prevData,
        email: storedUser.email,
        first_name: storedUser.first_name,
        last_name: storedUser.last_name,
        phone_number: storedUser.phone_number,
      }));
    }
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTicketChange = (type, value) => {
    setFormData((prevData) => ({
      ...prevData,
      tickets: {
        ...prevData.tickets,
        [type]: value,
      },
    }));
  };

  const calculateTotalPrice = () => {
    if (!event) {
      return 0;
    }

    const { regular_ticket_price, vip_ticket_price, vvip_ticket_price } = event;

    const { tickets } = formData;

    const totalRegularPrice = tickets.regular * regular_ticket_price;
    const totalVipPrice = tickets.vip * vip_ticket_price;
    const totalVvipPrice = tickets.vvip * vvip_ticket_price;

    const totalPrice = totalRegularPrice + totalVipPrice + totalVvipPrice;

    return totalPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/events/buy-event-ticket/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${formData.token}`,
          },
          body: JSON.stringify({
            event: eventId,
            ...formData,
          }),
        }
      );

      if (response.ok) {
        console.log("Ticket purchase successful!");
      } else {
        console.error("Failed to purchase ticket");
      }
    } catch (error) {
      console.error("Error occurred while purchasing ticket:", error);
    }
  };

  if (!event || !user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <section className="ticket_booking_area section_gap">
        <div className="container">
          <h2>{event.title}</h2>
          <p>
            Welcome, {user.first_name} {user.last_name}!
          </p>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly
            />

            {/* Add similar input fields for other user details */}
            <label>Regular Tickets:</label>
            <input
              type="number"
              name="regular_tickets"
              value={formData.tickets.regular}
              onChange={(e) =>
                handleTicketChange("regular", parseInt(e.target.value, 10))
              }
            />

            {/* Add similar input fields for other ticket types */}
            <label>Ticket Type:</label>
            <select
              name="ticket_type"
              value={formData.ticket_type}
              onChange={handleInputChange}
            >
              <option value="Single">Single</option>
              <option value="Multiple">Multiple</option>
            </select>

            {/* Ticket Quantity Inputs */}
            <div className="ticket-quantity">
              <label>VIP Tickets:</label>
              <input
                type="number"
                name="vip_tickets"
                value={formData.tickets.vip}
                onChange={(e) =>
                  handleTicketChange("vip", parseInt(e.target.value, 10))
                }
              />

              {/* Add similar input fields for other ticket types */}
              <label>VVIP Tickets:</label>
              <input
                type="number"
                name="vvip_tickets"
                value={formData.tickets.vvip}
                onChange={(e) =>
                  handleTicketChange("vvip", parseInt(e.target.value, 10))
                }
              />
            </div>

            {/* Ticket Summary */}
            <div className="ticket-summary">
              <h3>Ticket Summary</h3>
              <div>
                <p>Regular Tickets: {formData.tickets.regular}</p>
                <p>VIP Tickets: {formData.tickets.vip}</p>
                <p>VVIP Tickets: {formData.tickets.vvip}</p>
              </div>
              <p>Total Price: ${calculateTotalPrice()}</p>
            </div>

            {/* Add a button to proceed with the purchase */}
            <button type="submit">Purchase Tickets</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventTicket;
