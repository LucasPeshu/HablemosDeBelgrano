import React from 'react';
import { Link } from 'react-router-dom';

const CardLatestNews = ({ thumbnail, title, description, slug }) => {
  return (
    <Link to={`/noticia/${slug}`} className="block">
      <div className="relative overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img className="h-64 w-full object-cover" src={'https://res.cloudinary.com/diadzh30o/' + thumbnail} alt={title} />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-6 py-4">
          <div className="font-bold text-xl mb-2 text-white line-clamp-2">{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default CardLatestNews;