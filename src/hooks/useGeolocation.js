import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    country: "",
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchCountryByIP = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setLocation(prev => ({
          ...prev, 
          country: data.country_name, 
          loading: false
        }));
      } catch (error) {
        setLocation(prev => ({
          ...prev, 
          error: "IP-based location failed", 
          loading: false
        }));
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setLocation(prev => ({
              ...prev,
              country: data.countryName,
              loading: false
            }));
          } catch (error) {
            fetchCountryByIP(); // Fallback
          }
        },
        (error) => {
          fetchCountryByIP(); // Fallback
        }
      );
    } else {
      fetchCountryByIP(); // Fallback
    }
  }, []);

  return location;
};

export default useGeolocation;