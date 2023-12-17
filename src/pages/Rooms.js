import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const Rooms = () => {
  const [roomsData, setRoomsData] = useState([]);
  const { propertyname } = useParams();
  
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
                    <a href="#" className="btn theme_btn button_hover">
                      Book Now
                    </a>
                  </div>
                  <a href="#">
                    <h4 className="sec_h4">{room.room_type}</h4>
                  </a>
                  <h5>
                    ${room.rate}
                    <small>/night</small>
                  </h5>
                  {/* You can display other room details here */}
                  <p>Amenities: {room.amenities}</p>
                  <p>View: {room.view}</p>
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
                <div className="row">
                  <div className="col-md-4">
                    <div className="book_tabel_item">
                      <div className="form-group">
                        <div className="input-group date" id="datetimepicker11">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Arrival Date"
                          />
                          <span className="input-group-addon">
                            <i className="fa fa-calendar" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group date" id="datetimepicker1">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Departure Date"
                          />
                          <span className="input-group-addon">
                            <i className="fa fa-calendar" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="book_tabel_item">
                      <div className="input-group">
                        <select className="wide">
                          <option data-display="Adult">Adult</option>
                          <option value={1}>Old</option>
                          <option value={2}>Younger</option>
                          <option value={3}>Potato</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <select className="wide">
                          <option data-display="Child">Child</option>
                          <option value={1}>Child</option>
                          <option value={2}>Baby</option>
                          <option value={3}>Child</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="book_tabel_item">
                      <div className="input-group">
                        <select className="wide">
                          <option data-display="Child">Number of Rooms</option>
                          <option value={1}>Room 01</option>
                          <option value={2}>Room 02</option>
                          <option value={3}>Room 03</option>
                        </select>
                      </div>
                      <a className="book_now_btn button_hover" href="#">
                        Book Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
