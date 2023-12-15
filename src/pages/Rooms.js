import Navbar from "../components/Navbar";

const Rooms = () => {
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
      {/*================Breadcrumb Area =================*/}
      {/*================ Accomodation Area  =================*/}
      <section className="accomodation_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Accomodation</h2>
            <p>
              We all live in an age that belongs to the young at heart. Life
              that is becoming extremely fast,
            </p>
          </div>
          <div className="row mb_30">
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="image/room1.jpg" alt />
                  <a href="#" className="btn theme_btn button_hover">
                    Book Now
                  </a>
                </div>
                <a href="#">
                  <h4 className="sec_h4">Double Deluxe Room</h4>
                </a>
                <h5>
                  $250<small>/night</small>
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="image/room2.jpg" alt />
                  <a href="#" className="btn theme_btn button_hover">
                    Book Now
                  </a>
                </div>
                <a href="#">
                  <h4 className="sec_h4">Single Deluxe Room</h4>
                </a>
                <h5>
                  $200<small>/night</small>
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="image/room3.jpg" alt />
                  <a href="#" className="btn theme_btn button_hover">
                    Book Now
                  </a>
                </div>
                <a href="#">
                  <h4 className="sec_h4">Honeymoon Suit</h4>
                </a>
                <h5>
                  $750<small>/night</small>
                </h5>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="accomodation_item text-center">
                <div className="hotel_img">
                  <img src="image/room4.jpg" alt />
                  <a href="#" className="btn theme_btn button_hover">
                    Book Now
                  </a>
                </div>
                <a href="#">
                  <h4 className="sec_h4">Economy Double</h4>
                </a>
                <h5>
                  $200<small>/night</small>
                </h5>
              </div>
            </div>
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
