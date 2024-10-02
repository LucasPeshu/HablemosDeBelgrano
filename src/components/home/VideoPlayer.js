import React, { useEffect } from 'react';
import { getTransmissionLink } from 'redux/actions/transmission/transmission';
import { connect } from 'react-redux';
import { FaYoutube } from 'react-icons/fa';
import SocialMedia from './SocialMedia';
import backgroundImageYotube from '../../assets/img/suscribite-al-canal.webp';
import backgroundImage from '../../assets/img/BannerPirataAnimado.jpeg';

const YouTubePlayer = ({ link, getTransmissionLink }) => {
  useEffect(() => {
    getTransmissionLink();
  }, [getTransmissionLink]);

// Función para transformar el enlace a un formato válido de YouTube Embed
const getEmbedUrl = (videoLink) => {
  if (!videoLink || typeof videoLink !== 'string') return ''; 
  const videoIdMatch = videoLink.match(/v=([^&]+)/); 
  if (videoIdMatch) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`; 
  }
  return ''; 
};


  const embedUrl = getEmbedUrl(link.link);

  return (
    <div className='relative py-6' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-gray-200 opacity-80"></div> {/* Capa de superposición */}
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 py-4 px-4 sm:px-4 lg:px-52">
        <div className="col-span-1 sm:col-span-1">
          {embedUrl ? (
            <iframe
              className="w-full h-64 md:h-96 rounded-lg"
              src={embedUrl} 
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-white">Cargando transmisión...</p>
          )}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <div className="col-span-2 relative p-4 rounded-lg shadow-md flex flex-col justify-between bg-cover bg-no-repeat bg-bottom" style={{ backgroundImage: `url(${backgroundImageYotube})` }}>
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div className="relative z-10 p-4">
              <h2 className="text-2xl font-bold mb-4 text-white">Mira nuestra última transmisión</h2>
              <p className="text-gray-200">
                ¡No te pierdas nuestra última transmisión en nuestro canal de YouTube! Haz clic en el video para verlo ahora.
              </p>
            </div>
            <a
              href="https://www.youtube.com/@hablemosdebelgrano"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-block px-6 py-2 mt-4 text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition duration-300"
            >
              <FaYoutube className="inline-block mr-2 text-2xl" />
              Suscríbete a nuestro canal
            </a>
          </div>
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  link: state.transmission.link || '',
});

export default connect(mapStateToProps, { getTransmissionLink })(YouTubePlayer);
