import React, { useState } from "react";

const SearchBar = ({ defaultLocation, onSearch }) => {
  const [location, setLocation] = useState(defaultLocation || "");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, checkInDate, checkOutDate });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        {/* Location Input */}
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Check-in Date */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
            Check-in
          </label>
          <input
            type="date"
            id="checkIn"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
            Check-out
          </label>
          <input
            type="date"
            id="checkOut"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Search Button */}
        <div className="flex-1 min-w-[100px] self-end">
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;