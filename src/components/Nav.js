import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };

  return (
    <nav style={{ backgroundColor: 'darkgray', padding: '10px' }}>
      <ul style={{ display: 'flex', justifyContent: 'space-between', listStyle: 'none' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0px 20px' }}>
            Home
          </Link>
        </li>
        <li style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Link to="/postblog" style={{ color: 'white', textDecoration: 'none', padding: '0px 20px' }}>
            Post Blog
          </Link>
          <Link to="/display" style={{ color: 'white', textDecoration: 'none', marginLeft: '10px', padding: '0px 20px' }}>
            Display Blogs
          </Link>
        </li>
        <li>
          <div style={{ display: 'flex' }}>
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} style={{ color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '0px 20px' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '10px', padding: '0px 20px' }}>
                  Login
                </Link>
                <Link to="/signup" style={{ color: 'white', textDecoration: 'none', padding: '0px 20px', display: isLoggedIn ? 'none' : 'block' }}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
