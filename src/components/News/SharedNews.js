import React from 'react';
import { FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const SharedNews = ({ url, title }) => {
  const message = `Mira esta noticia: ${url}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Compartir en:</h3>
      <div className="flex space-x-4">
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
          <FaTwitter size={24} />
        </a>
        <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
          <FaWhatsapp size={24} />
        </a>
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:text-blue-900">
          <FaFacebook size={24} />
        </a>
      </div>
    </div>
  );
};

export default SharedNews;