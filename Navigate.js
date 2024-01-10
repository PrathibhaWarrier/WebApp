// LogoButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './path/to/your/logo.png'; // Import your logo image

const LogoButton = ({ to, alt, className }) => {
  return (
    <Link to={to} className={className}>
      <img src={logoImage} alt={alt} />
    </Link>
  );
};

export default LogoButton;
