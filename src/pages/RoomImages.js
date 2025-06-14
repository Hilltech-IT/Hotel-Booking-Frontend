
import React from "react";
import { FaExpand } from "react-icons/fa";

const RoomImages = ({ images }) => {
  console.log(images);
  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Property Gallery</h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our beautiful property through these stunning images
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={image.image}
                alt={`Property ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Property+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <a 
                  href={image.image} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-300 transition-colors duration-300"
                  title="View full size"
                >
                  <FaExpand className="text-2xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomImages;