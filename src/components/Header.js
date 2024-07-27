import React from 'react';
import logo from '../assets/qunatLogo.png'; 

const Header = () => {
  return (
    <div>
      <img src={logo} alt="Qunatasip Logo" style={{ height: '40px' }} />
      <h1>I am a header</h1>
    </div>
  );
}

export default Header;
