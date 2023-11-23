import './App.css';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div>
      <Routes>
      <Route exact  path="/" element={ <Home/> }/>
      <Route exact  path="/about" element={ <About/> }/>
      </Routes>
    </div>
  );
}

export default App;
