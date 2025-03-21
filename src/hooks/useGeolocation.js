import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          setUserCountry(data.countryName);
        } catch (error) {
          console.error("Error fetching user country:", error);
        }
      });
    } else {
      fetch("https://ipapi.co/json/")
        .then((response) => response.json())
        .then((data) => {
          setUserCountry(data.country_name);
        })
        .catch((error) => {
          console.error("Error fetching user country:", error);
        });
    }
  }, []);

  return userCountry;
};

export default useGeolocation;