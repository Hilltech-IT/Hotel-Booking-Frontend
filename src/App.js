import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/LoginIn";
import Listing from "./pages/Listing";
import Rooms from "./pages/Rooms";
import Account from "./pages/Account";



function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/rooms/:propertyname" element={<Rooms />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
