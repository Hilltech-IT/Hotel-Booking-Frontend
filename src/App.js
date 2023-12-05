import './App.css';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/LoginIn';
import Listing from './pages/Listing';


function App() {
  return (
    <div>
      <Routes>
      <Route exact  path="/" element={ <Home/> }/>
      <Route exact  path="/about" element={ <About/> }/>
      <Route path="/register" element={ <Register/> } />
      <Route path="/login" element={ <Login/> } />
      <Route path="/listing" element={ <Listing /> } />
      </Routes>
    </div>
  );
}

export default App;
