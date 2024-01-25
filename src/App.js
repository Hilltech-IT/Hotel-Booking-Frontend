import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/LoginIn";
import Listing from "./pages/Listing";
import Rooms from "./pages/Rooms";
import Account from "./pages/Account";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import EventListing from "./pages/EventListing";
import EventTicket from "./pages/EventTicket";

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
        <Route path="/listing" element={<Listing />} />
        <Route path="/rooms/:propertyname" element={<Rooms />} />
        <Route path="/account" element={<Account />} />
        <Route path="/events" element={<EventListing />} />
        <Route path="/events/:eventId/book" element={<EventTicket/>} />
      </Routes>
    </div>
  );
}

export default App;
