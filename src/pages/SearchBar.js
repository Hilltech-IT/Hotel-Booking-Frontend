import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const SearchBar = ({ 
  defaultLocation, 
  onSearch, 
  isLoading = false,
  defaultCheckInDate = "", 
  defaultCheckOutDate = ""
}) => {
  const [location, setLocation] = useState(defaultLocation || "");
  const [checkInDate, setCheckInDate] = useState(defaultCheckInDate || "");
  const [checkOutDate, setCheckOutDate] = useState(defaultCheckOutDate || "");
  const [countries, setCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const wrapperRef = useRef(null);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const formattedCountries = data
          .map(country => ({
            name: country.name.common,
            code: country.cca2
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(formattedCountries);
        setFilteredCountries(formattedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Sync with parent's default values
  useEffect(() => {
    setLocation(defaultLocation || "");
  }, [defaultLocation]);

  // Filter countries based on input
  useEffect(() => {
    if (location) {
      const filtered = countries.filter(country =>
        country.name.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  }, [location, countries]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, checkInDate, checkOutDate });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        {/* Location Input */}
        <div className="flex-1 min-w-[200px] relative" ref={wrapperRef}>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              placeholder="Enter country name"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <FaChevronDown 
              className="absolute right-3 top-3 text-gray-400"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>
          
          {showDropdown && filteredCountries.length > 0 && (
            <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setLocation(country.name);
                    setShowDropdown(false);
                  }}
                >
                  {country.name}
                </div>
              ))}
            </div>
          )}
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
            disabled={isLoading}
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
            min={checkInDate}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
        </div>

        {/* Search Button */}
        <div className="flex-1 min-w-[100px] self-end">
          <button
            type="submit"
            className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 disabled:bg-purple-400"
            disabled={isLoading || !location}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;