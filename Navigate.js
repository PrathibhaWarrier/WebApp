// YourComponent.js
import React from 'react';
import LogoButton from './LogoButton'; // Import the LogoButton component

const YourComponent = () => {
  return (
    <div>
      {/* Other content */}
      <LogoButton to="/target-page" alt="Logo Alt Text" className="your-logo-button" />
    </div>
  );
};

export default YourComponent;

