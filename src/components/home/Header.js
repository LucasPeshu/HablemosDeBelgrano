import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Alberdi from '../../assets/img/banner.jpg';

function Header() {
  return (
    <div
      className="relative flex items-center justify-center h-72 bg-cover bg-center"
      style={{ backgroundImage: `url(${Alberdi})` }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-90"></div>
      <h1 className="relative text-5xl lg:text-6xl font-bold text-white p-2 text-center">
        <Typewriter
          words={['Hablemos de Belgrano', 'Por Radio ShowSport 101.3 FM', 'De Lunes a Viernes de 19:00 a 20:00hs']}
          loop={0}
          cursor
          cursorStyle='.'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={3000}
        />
      </h1>
    </div>
  );
}

export default Header;