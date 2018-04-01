import React from 'react';

import CityInput from './CityInput';

import logo from '../assets/images/logo.jpg';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="Navbar-logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="Navbar-item">
        <CityInput />
      </div>
    </nav>
  );
};

export default Navbar;
