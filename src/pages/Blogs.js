const Blogs = () => {
  return (
    <>
      <section className="latest_blog_area section_gap">
        <div className="container">
          <div className="section_title text-center">
            <h2 className="title_color">Explore Travel Stories</h2>
            <p>
              Embark on a journey through the experiences and discoveries shared
              by fellow travelers.
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
                      Adventure
                    </a>
                    <a href="#" className="button_hover tag_btn">
                      Culture
                    </a>
                  </div>
                  <a href="#">
                    <h4 className="sec_h4">Exploring Offbeat Destinations</h4>
                  </a>
                  <p>
                    Uncover hidden gems and lesser-known spots that redefine
                    travel experiences.
                  </p>
                  <h6 className="date title_color">31st January, 2023</h6>
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
                      Adventure
                    </a>
                    <a href="#" className="button_hover tag_btn">
                      Travel Tips
                    </a>
                  </div>
                  <a href="#">
                    <h4 className="sec_h4">
                      Capturing the Essence of Local Cuisine
                    </h4>
                  </a>
                  <p>
                    Delve into the diverse flavors and culinary delights from
                    around the world.
                  </p>
                  <h6 className="date title_color">31st January, 2023</h6>
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
                      Adventure
                    </a>
                    <a href="#" className="button_hover tag_btn">
                      Travel Diaries
                    </a>
                  </div>
                  <a href="#">
                    <h4 className="sec_h4">
                      Unplanned Adventures: Embracing Spontaneity
                    </h4>
                  </a>
                  <p>
                    Embrace the beauty of unplanned journeys and unexpected
                    experiences.
                  </p>
                  <h6 className="date title_color">31st January, 2023</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Blogs;
