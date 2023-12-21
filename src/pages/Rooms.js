import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { HotelContext } from "../context/HotelContext";

const Rooms = () => {
  const [roomsData, setRoomsData] = useState([]);
  const { propertyname } = useParams();
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [roomsBooked, setRoomsBooked] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedPropertyName = encodeURIComponent(propertyname);
        const response = await fetch(`http://127.0.0.1:8000/properties/api/rooms/?search=${encodedPropertyName}`);
        const data = await response.json();
        if (data && data.results) {
          setRoomsData(data.results);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchData();
  }, [propertyname]);

  const { selectHotel, selectedHotel, selectRoom, selectedRoom } = useContext(HotelContext);
  console.log(selectedHotel)

  const handleRoomSelection = (propertyId, roomId, roomType, chargePerNight, roomsCount ) => {
    localStorage.setItem("roomObj", JSON.stringify({
      "propertyId": propertyId, 
      "roomId": roomId,
      "roomType": roomType,
      "chargePerNight": chargePerNight,
      "roomsCount": roomsCount
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (checkinDate && checkoutDate && roomsBooked) {
      console.log(`Room: , Checkin Date: ${checkinDate}, Checkout Date: ${checkoutDate}, Rooms Booked: ${roomsBooked}`)
    }

  }

  // useEffect(() => {
  //   // Fetch data from the API endpoint
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://127.0.0.1:8000/properties/api/rooms/?search=${propertyname}/`
  //       );
  //       const data = await response.json();
  //       if (data && data.results) {
  //         setRoomsData(data.results);
  //         console.log(roomsData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       // Handle error scenarios as needed
  //     }
  //   };

  //   fetchData();
  // }, [propertyname]); // Empty dependency array ensures this runs only once on component mount

  return (
    <div>
      <Navbar />
      <section className="breadcrumb_area">
        <div
          className="overlay bg-parallax"
          data-stellar-ratio="0.8"
          data-stellar-vertical-offset={0}
          data-background
        />
        <div className="container">
          <div className="page-cover text-center">
            <h2 className="page-cover-tittle">Accomodation</h2>
            <ol className="breadcrumb">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="active">Accomodation</li>
            </ol>
          </div>
        </div>
      </section>
      <section className="accomodation_area section_gap">
        <div className="container">
          {/* Your existing section_title */}
          <div className="section_title text-center">
            <h2 className="title_color">Rooms</h2>
          </div>
          <div className="row mb_30">
            {/* Loop through roomsData to display room information */}
            {roomsData.map((room) => (
              <div className="col-lg-3 col-sm-6" key={room.id}>
                <div className="accomodation_item text-center card rounded">
                  <div className="hotel_img">
                    {/* Use placeholder image URL directly in src */}
                    <img src="/image/room1.jpg" alt="Placeholder" />
                    {room.rooms_count &&
                      <button onClick={() => handleRoomSelection(
                        room.property, room.id, room.room_type, room.rate, room.rooms_count
                      )} className="btn theme_btn button_hover">
                      Book Now
                    </button>

                    }

                  </div>
                  <a href="#">
                    <h4 className="sec_h4">{room.room_type}</h4>
                  </a>
                  <h6>
                    KES.{room.rate}
                    <small>/night</small>
                  </h6>
                  {/* You can display other room details here */}
                  <p>Amenities: {room.amenities}</p>
                  <p>View: {room.view}</p>
                  <p>Available Rooms: {room.rooms_count}</p>
                  {/* Add more details as needed */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*================ Accomodation Area  =================*/}
      {/*================Booking Tabel Area =================*/}
      <section className="hotel_booking_area">
        <div className="container">
          <div className="row hotel_booking_table">
            <div className="col-md-3">
              <h2>
                Book
                <br /> Your Room
              </h2>
            </div>
            <div className="col-md-9">
              <div className="boking_table">
                <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="book_tabel_item">
                      <div className="form-group">
                        <div className="input-group" id="datetimepicker11">
                          <input
                            type="date"
                            id="checkin_date"
                            name="checkin_date"
                            className="form-control"
                            placeholder="Checkin Date"
                            onChange={(e) => setCheckinDate(e.target.value)}
                            required
                          />
                          
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group date" id="datetimepicker1">
                          <input
                            type="date"
                            id="checkout_date"
                            name="checkout_date"
                            className="form-control"
                            placeholder="Checkout Date"
                            onChange={(e) => setCheckoutDate(e.target.value)}
                            required
                          />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="book_tabel_item">
                      <div className="form-group">
                        <div className="input-group date" id="datetimepicker11">
                          <input
                            type="number"
                            id="rooms_booked"
                            name="rooms_booked"
                            className="form-control"
                            placeholder="Number of rooms"
                            onChange={(e) => setRoomsBooked(e.target.value)}
                            required
                          />
                          
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group date" id="datetimepicker1">
                          <p>Total: 9000</p>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <div className="col-md-4">
                    <div className="book_tabel_item">
                      <button className="book_now_btn button_hover">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
