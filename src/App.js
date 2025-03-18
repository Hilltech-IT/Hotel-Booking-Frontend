import "./App.css";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/LoginIn";
import Listing from "./pages/Listing";
import Rooms from "./pages/Rooms";
import Account from "./pages/Account";

import EventListing from "./pages/EventListing";
import EventTicket from "./pages/EventTicket";
import AirBnb from "./pages/AirBnb";
import EventSpace from "./pages/EventSpace";

import PaymentCallback from "./pages/PaymentCallback";

//User URLS
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ActivateAccount from "./pages/ActivateAccount";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate-account/:token" element={<ActivateAccount />} />

        <Route path="/listing" element={<Listing />} />
        <Route path="/rooms/:propertyname" element={<Rooms />} />
        <Route path="/account" element={<Account />} />
        <Route path="/events" element={<EventListing />} />
        <Route path="/events/:eventId" element={<EventTicket />} />
        <Route path="/airbnb/:propertyId" element={<AirBnb />} />
        <Route path="/event-space/:propertyId" element={<EventSpace />} />
        <Route path="/payment-callback/" element={<PaymentCallback />} />
      </Routes>
    </div>
  );
}

export default App;
