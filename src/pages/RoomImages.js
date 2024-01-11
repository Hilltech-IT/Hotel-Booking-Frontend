import React from "react";

const RoomImages = ({ images }) => {
  return (
    <section className="gallery_area section_gap">
      <div className="container">
        <div className="section_title text-center">
          <h4 className="title_color">Gallarey</h4>
          {/* Additional description if needed */}
        </div>
        <div className="row custom_gallery">
          {images.map((image, index) => (
            <div className="col-md-4 gallery_item mb-3" key={index}>
              <div className="gallery_img">
                <img
                  src={image.image}
                  alt={`Room ${index + 1}`}
                  className="img-fluid"
                />
                <div className="hover">
                  <a className="light" href={image.image}>
                    <i className="fa fa-expand"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomImages;
