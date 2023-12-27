const Recommendations = () =>{
    return(
        <>
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
        </>
    )
}

export default Recommendations;