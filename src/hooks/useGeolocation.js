import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    const fetchCountryByIP = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setUserCountry(data.country_name);
      } catch (error) {
        console.error("Error fetching user country by IP:", error);
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
            setUserCountry(data.countryName);
          } catch (error) {
            console.error("Error fetching user country:", error);
            fetchCountryByIP(); // Fallback to IP-based geolocation
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          fetchCountryByIP(); // Fallback to IP-based geolocation
        }
      );
    } else {
      fetchCountryByIP(); // Fallback to IP-based geolocation
    }
  }, []);

  return userCountry;
};

export default useGeolocation;