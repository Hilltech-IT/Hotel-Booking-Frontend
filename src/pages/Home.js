import React from "react";
import Navbar from "../components/Navbar";
import Services from "./Services";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <section className="banner_area">
          <div className="booking_table d_flex align-items-center">
            <div
              className="overlay bg-parallax"
              data-stellar-ratio="0.9"
              data-stellar-vertical-offset={0}
              data-background
            />
            <div className="container">
              <div className="banner_content text-center">
                <h6>Away from monotonous life</h6>
                <h4>Search and Discover: Your Gateway to Hotel Exploration</h4>
                {/* <p>
                  Welcome to our hotel booking app, where comfort meets
                  convenience!
                  <br />
                  Discover a world of seamless travel planning at your
                  fingertips
                </p> */}
                <a href="#" className="btn theme_btn button_hover">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="hotel_booking_area position">
            <div className="container">
              <div className="hotel_booking_table">
                {/* <div className="col-md-3">
                  <h2>
                    Book
                    <br /> Your Room
                  </h2>
                </div> */}
                <div className="col-md-12">
                  <div className="boking_table">
                    {/* <div className="row">
                      <div className="col-md-4">
                        <div className="book_tabel_item">
                          <div className="form-group">
                            <div
                              className="input-group date"
                              id="datetimepicker11"
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Arrival Date"
                              />
                              <span className="input-group-addon">
                                <i
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="form-group">
                            <div
                              className="input-group date"
                              id="datetimepicker1"
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Departure Date"
                              />
                              <span className="input-group-addon">
                                <i
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                />
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
                              <option data-display="Child">
                                Number of Rooms
                              </option>
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
                    </div> */}
                    <div
                      className="row mb-5"
                      style={{
                        backgroundColor: "#fffff",
                        borderRadius: "15px",
                        boxShadow: "2px 4px 8px rgba(0.2, 0, 0, 0.2)",
                        padding: "10px",
                      }}
                    >
                      <div className="col-md-12">
                        <form className="form-inline">
                          <div className="form-group mr-1">
                            <input
                              type="text"
                              className="form-control ml-1"
                              id="location"
                              placeholder="location"
                            />
                          </div>
                          <div className="form-group mr-1">
                            <label htmlFor="checkIn">In:</label>
                            <input
                              type="date"
                              className="form-control ml-1"
                              id="checkIn"
                              placeholder="Enter location"
                            />
                          </div>
                          <div className="form-group mr-2">
                            <label htmlFor="checkOut">out:</label>
                            <input
                              type="date"
                              className="form-control ml-1"
                              id="checkOut"
                            />
                          </div>
                          <div className="form-group mr-1">
                            <label htmlFor="rooms">Rooms:</label>
                            <select className="form-control ml-1" id="rooms">
                              {/* Options for selecting number of rooms */}
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              {/* Add more options if needed */}
                            </select>
                          </div>
                          <div className="form-group mr-1">
                            <label htmlFor="adults">Adults:</label>
                            <select className="form-control ml-1" id="adults">
                              {/* Options for selecting number of adults */}
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              {/* Add more options if needed */}
                            </select>
                          </div>
                          <div className="form-group mr-1">
                            <label htmlFor="children">Children:</label>
                            <select className="form-control ml-1" id="children">
                              {/* Options for selecting number of children */}
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              {/* Add more options if needed */}
                            </select>
                          </div>
                          <div className="form-group mt-2">
                            <button type="submit" className="btn btn-primary">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*================Banner Area =================*/}
        {/*================ Accomodation Area  =================*/}
        <section className="accomodation_area section_gap">
          <div className="container">
            <div className="section_title text-center">
              <h2 className="title_color">Hotel Recommendations</h2>
              <p>
                We all live in an age that belongs to the young at heart. Life
                that is becoming extremely fast,{" "}
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
        {/*================ Facilities Area  =================*/}
        <section className="facilities_area section_gap">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.8"
            data-stellar-vertical-offset={0}
            data-background
          ></div>
          <div className="container">
            <div className="section_title text-center">
              <h2 className="title_w">Royal Facilities</h2>
              <p>Who are in extremely love with eco friendly system.</p>
            </div>
            <div className="row mb_30">
              <div className="col-lg-4 col-md-6">
                <div className="facilities_item">
                  <h4 className="sec_h4">
                    <i className="lnr lnr-dinner" />
                    Restaurant
                  </h4>
                  <p>
                    Usage of the Internet is becoming more common due to rapid
                    advancement of technology and power.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="facilities_item">
                  <h4 className="sec_h4">
                    <i className="lnr lnr-bicycle" />
                    Sports CLub
                  </h4>
                  <p>
                    Usage of the Internet is becoming more common due to rapid
                    advancement of technology and power.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="facilities_item">
                  <h4 className="sec_h4">
                    <i className="lnr lnr-shirt" />
                    Swimming Pool
                  </h4>
                  <p>
                    Usage of the Internet is becoming more common due to rapid
                    advancement of technology and power.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="facilities_item">
                  <h4 className="sec_h4">
                    <i className="lnr lnr-car" />
                    Rent a Car
                  </h4>
                  <p>
                    Usage of the Internet is becoming more common due to rapid
                    advancement of technology and power.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="facilities_item">
                  <h4 className="sec_h4">
                    <i className="lnr lnr-construction" />
                    Gymnesium
                  </h4>
                  <p>
                    Usage of the Internet is becoming more common due to rapid
                    advancement of technology and power.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="facilities_item">
                  <h4 className="sec_h4">
                    <i className="lnr lnr-coffee-cup" />
                    Bar
                  </h4>
                  <p>
                    Usage of the Internet is becoming more common due to rapid
                    advancement of technology and power.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*================ Facilities Area  =================*/}
        {/*================ About History Area  =================*/}
        <section className="about_history_area section_gap">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d_flex align-items-center">
                <div className="about_content ">
                  <h2 className="title title_color">
                    About Us <br />
                    Our History
                    <br />
                    Mission &amp; Vision
                  </h2>
                  <p>
                    inappropriate behavior is often laughed off as “boys will be
                    boys,” women face higher conduct standards especially in the
                    workplace. That’s why it’s crucial that, as women, our
                    behavior on the job is beyond reproach. inappropriate
                    behavior is often laughed.
                  </p>
                  <a href="#" className="button_hover theme_btn_two">
                    Request Custom Price
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <img className="img-fluid" src="image/about_bg.jpg" alt="img" />
              </div>
            </div>
          </div>
        </section>
        {/*================ About History Area  =================*/}
        {/*================ Testimonial Area  =================*/}
        <section className="testimonial_area section_gap">
          <div className="container">
            <div className="section_title text-center">
              <h2 className="title_color">Testimonial from our Clients</h2>
              <p>
                The French Revolution constituted for the conscience of the
                dominant aristocratic class a fall from{" "}
              </p>
            </div>
            <div className="testimonial_slider owl-carousel">
              <div className="media testimonial_item">
                <img
                  className="rounded-circle"
                  src="image/testtimonial-1.jpg"
                  alt
                />
                <div className="media-body">
                  <p>
                    As conscious traveling Paupers we must always be concerned
                    about our dear Mother Earth. If you think about it, you
                    travel across her face, and She is the{" "}
                  </p>
                  <a href="#">
                    <h4 className="sec_h4">Fanny Spencer</h4>
                  </a>
                  <div className="star">
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star-half-o" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="media testimonial_item">
                <img
                  className="rounded-circle"
                  src="image/testtimonial-1.jpg"
                  alt
                />
                <div className="media-body">
                  <p>
                    As conscious traveling Paupers we must always be concerned
                    about our dear Mother Earth. If you think about it, you
                    travel across her face, and She is the{" "}
                  </p>
                  <a href="#">
                    <h4 className="sec_h4">Fanny Spencer</h4>
                  </a>
                  <div className="star">
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star-half-o" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="media testimonial_item">
                <img
                  className="rounded-circle"
                  src="image/testtimonial-1.jpg"
                  alt
                />
                <div className="media-body">
                  <p>
                    As conscious traveling Paupers we must always be concerned
                    about our dear Mother Earth. If you think about it, you
                    travel across her face, and She is the{" "}
                  </p>
                  <a href="#">
                    <h4 className="sec_h4">Fanny Spencer</h4>
                  </a>
                  <div className="star">
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star-half-o" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="media testimonial_item">
                <img
                  className="rounded-circle"
                  src="image/testtimonial-1.jpg"
                  alt
                />
                <div className="media-body">
                  <p>
                    As conscious traveling Paupers we must always be concerned
                    about our dear Mother Earth. If you think about it, you
                    travel across her face, and She is the{" "}
                  </p>
                  <a href="#">
                    <h4 className="sec_h4">Fanny Spencer</h4>
                  </a>
                  <div className="star">
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                    <a href="#">
                      <i className="fa fa-star-half-o" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="latest_blog_area section_gap">
          <div className="container">
            <div className="section_title text-center">
              <h2 className="title_color">latest posts from blog</h2>
              <p>
                The French Revolution constituted for the conscience of the
                dominant aristocratic class a fall from{" "}
              </p>
            </div>
            <div className="row mb_30">
              <div className="col-lg-4 col-md-6">
                <div className="single-recent-blog-post">
                  <div className="thumb">
                    <img
                      className="img-fluid"
                      src="image/blog/blog-1.jpg"
                      alt="post"
                    />
                  </div>
                  <div className="details">
                    <div className="tags">
                      <a href="#" className="button_hover tag_btn">
                        Travel
                      </a>
                      <a href="#" className="button_hover tag_btn">
                        Life Style
                      </a>
                    </div>
                    <a href="#">
                      <h4 className="sec_h4">Low Cost Advertising</h4>
                    </a>
                    <p>
                      Acres of Diamonds… you’ve read the famous story, or at
                      least had it related to you. A farmer.
                    </p>
                    <h6 className="date title_color">31st January,2018</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-recent-blog-post">
                  <div className="thumb">
                    <img
                      className="img-fluid"
                      src="image/blog/blog-2.jpg"
                      alt="post"
                    />
                  </div>
                  <div className="details">
                    <div className="tags">
                      <a href="#" className="button_hover tag_btn">
                        Travel
                      </a>
                      <a href="#" className="button_hover tag_btn">
                        Life Style
                      </a>
                    </div>
                    <a href="#">
                      <h4 className="sec_h4">Creative Outdoor Ads</h4>
                    </a>
                    <p>
                      Self-doubt and fear interfere with our ability to achieve
                      or set goals. Self-doubt and fear are
                    </p>
                    <h6 className="date title_color">31st January,2018</h6>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-recent-blog-post">
                  <div className="thumb">
                    <img
                      className="img-fluid"
                      src="image/blog/blog-3.jpg"
                      alt="post"
                    />
                  </div>
                  <div className="details">
                    <div className="tags">
                      <a href="#" className="button_hover tag_btn">
                        Travel
                      </a>
                      <a href="#" className="button_hover tag_btn">
                        Life Style
                      </a>
                    </div>
                    <a href="#">
                      <h4 className="sec_h4">
                        It S Classified How To Utilize Free
                      </h4>
                    </a>
                    <p>
                      Why do you want to motivate yourself? Actually, just
                      answering that question fully can{" "}
                    </p>
                    <h6 className="date title_color">31st January,2018</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*================ Recent Area  =================*/}
        {/*================ start footer Area  =================*/}
        <footer className="footer-area section_gap">
          <div className="container">
            <div className="row">
              <div className="col-lg-3  col-md-6 col-sm-6">
                <div className="single-footer-widget">
                  <h6 className="footer_title">About Agency</h6>
                  <p>
                    The world has become so fast paced that people don’t want to
                    stand by reading a page of information, they would much
                    rather look at a presentation and understand the message. It
                    has come to a point{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-footer-widget">
                  <h6 className="footer_title">Navigation Links</h6>
                  <div className="row">
                    <div className="col-4">
                      <ul className="list_style">
                        <li>
                          <a href="#">Home</a>
                        </li>
                        <li>
                          <a href="#">Feature</a>
                        </li>
                        <li>
                          <a href="#">Services</a>
                        </li>
                        <li>
                          <a href="#">Portfolio</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <ul className="list_style">
                        <li>
                          <a href="#">Team</a>
                        </li>
                        <li>
                          <a href="#">Pricing</a>
                        </li>
                        <li>
                          <a href="#">Blog</a>
                        </li>
                        <li>
                          <a href="#">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-footer-widget">
                  <h6 className="footer_title">Newsletter</h6>
                  <p>
                    For business professionals caught between high OEM price and
                    mediocre print and graphic output,{" "}
                  </p>
                  <div id="mc_embed_signup">
                    <form
                      target="_blank"
                      action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&id=92a4423d01"
                      method="get"
                      className="subscribe_form relative"
                    >
                      <div className="input-group d-flex flex-row">
                        <input
                          name="EMAIL"
                          placeholder="Email Address"
                          onfocus="this.placeholder = ''"
                          onblur="this.placeholder = 'Email Address '"
                          required
                          type="email"
                        />
                        <button className="btn sub-btn">
                          <span className="lnr lnr-location" />
                        </button>
                      </div>
                      <div className="mt-10 info" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="single-footer-widget instafeed">
                  <h6 className="footer_title">InstaFeed</h6>
                  <ul className="list_style instafeed d-flex flex-wrap">
                    <li>
                      <img src="image/instagram/Image-01.jpg" alt />
                    </li>
                    <li>
                      <img src="image/instagram/Image-02.jpg" alt />
                    </li>
                    <li>
                      <img src="image/instagram/Image-03.jpg" alt />
                    </li>
                    <li>
                      <img src="image/instagram/Image-04.jpg" alt />
                    </li>
                    <li>
                      <img src="image/instagram/Image-05.jpg" alt />
                    </li>
                    <li>
                      <img src="image/instagram/Image-06.jpg" alt />
                    </li>
                    <li>
                      <img src="image/instagram/Image-07.jpg" alt />
                    </li>
                    <li>
                      <img src="image/instagram/Image-08.jpg" alt />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border_line" />
            <div className="row footer-bottom d-flex justify-content-between align-items-center">
              <p className="col-lg-8 col-sm-12 footer-text m-0">
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
                <a href="https://colorlib.com" target="_blank">
                  Colorlib
                </a>
                Link back to Colorlib can't be removed. Template is licensed
                under CC BY 3.0.
              </p>
              <div className="col-lg-4 col-sm-12 footer-social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-dribbble" />
                </a>
                <a href="#">
                  <i className="fa fa-behance" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
