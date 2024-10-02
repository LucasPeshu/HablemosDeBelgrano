import React from 'react';
import advertisingImage from '../../assets/img/Banner-Web-Republica.gif';

const Advertisement = ({ imageUrl, altText }) => {
  return (
    <div className="advertisement">
      <img src={advertisingImage} alt={altText} className="w-full h-auto" />
    </div>
  );
};

export default Advertisement;