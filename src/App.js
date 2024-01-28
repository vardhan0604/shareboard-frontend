// App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Whiteboard from './pages/Whiteboard/Whiteboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useState } from 'react';
import Home from './pages/Home/Home';
import Navbar from './component/Navbar';
// import Prac from './pages/Prac';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <Router>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/wb/:socketId"
          element={<Whiteboard />}
        />
        <Route
          path="/"
          element={<Home token={token} />}
        />
        {/* <Route
          path="/prac"
          element={<Prac token={token} />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
