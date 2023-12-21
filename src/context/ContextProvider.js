import React, { useContext, useState } from 'react';
import { HotelContext } from './HotelContext';

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const selectHotel = (hotelData) => {
        setSelectedHotel(hotelData);
    };

    const selectRoom = (roomdData) => {
      setSelectedRoom(roomdData);
    }

    const login = (userData) => {
        setUser(userData)
    }

  return (
    <HotelContext.Provider value={{user, selectedHotel, selectedRoom, login, selectHotel, selectRoom}}>
        {children}
    </HotelContext.Provider>
  )
}

export default ContextProvider