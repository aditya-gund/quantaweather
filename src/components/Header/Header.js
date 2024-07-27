import React from 'react';
import logo from '../../assets/qunatLogo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Qunatasip Logo" className="logo" />
      <h1 className="title">QunataSIP Weather Dashboard</h1>
    </header>
  );
}

export default Header;
