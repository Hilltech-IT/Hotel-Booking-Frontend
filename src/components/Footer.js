const Footer = () => {
  return (
    <>
      <footer className="footer-area section_gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6 className="footer_title">About Our Hotel Booking App</h6>
                <p>
                  Discover, book, and explore hotels in your preferred country
                  with ease. Receive personalized recommendations for your next
                  stay and travel smarter with our app.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6 className="footer_title">Explore Our App</h6>
                <div className="row">
                  <div className="col-4">
                    <ul className="list_style">
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Search Hotels</a>
                      </li>
                      <li>
                        <a href="#">Bookings</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-4">
                    <ul className="list_style">
                      <li>
                        <a href="#">Recommendations</a>
                      </li>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h6 className="footer_title">Join Our Newsletter</h6>
                <p>
                  Get exclusive deals, travel insights, and personalized
                  recommendations delivered directly to your inbox.
                </p>
                <div id="mc_embed_signup">
                  <form
                    target="_blank"
                    action="#"
                    method="get"
                    className="subscribe_form relative"
                  >
                    <div className="input-group d-flex flex-row">
                      <input
                        name="EMAIL"
                        placeholder="Your Email Address"
                        // onFocus="this.placeholder = ''"
                        // onBlur="this.placeholder = 'Your Email Address'"
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
                    <img src="../image/instagram/Image-01.jpg" alt />
                  </li>
                  <li>
                    <img src="../image/instagram/Image-02.jpg" alt />
                  </li>
                  <li>
                    <img src="../image/instagram/Image-03.jpg" alt />
                  </li>
                  <li>
                    <img src="../image/instagram/Image-04.jpg" alt />
                  </li>
                  <li>
                    <img src="../image/instagram/Image-05.jpg" alt />
                  </li>
                  <li>
                    <img src="../image/instagram/Image-06.jpg" alt />
                  </li>
                  <li>
                    <img src="../image/instagram/Image-07.jpg" alt />
                  </li>
                  <li>
                    <img src="../image/instagram/Image-08.jpg" alt />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border_line" />
          <div className="row footer-bottom d-flex justify-content-between align-items-center">
            <p className="col-lg-8 col-sm-12 footer-text m-0">
              © WonderWise - All rights reserved | Created with{" "}
              <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
              <a href="https://hilltechit.com/" target="_blank">
                HillTech IT
              </a>
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
    </>
  );
};

export default Footer;
