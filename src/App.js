import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import EditBlog from './components/EditBlog';
import DisplayBlog from './components/DisplayBlog';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout.js'; // Add this import for the Logout component

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/postblog" element={<EditBlog />} />
          <Route path="/display" element={<DisplayBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} /> {/* Add this route for the Logout component */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
