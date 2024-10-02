import React from 'react';
import { Link } from 'react-router-dom';

const CardCategory = ({ thumbnail, title, description, slug }) => {
  return (
    <Link to={`/noticia/${slug}`} className="block">
      <div className="overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img className="h-56 w-full object-cover" src={'https://res.cloudinary.com/diadzh30o/' + thumbnail} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 line-clamp-2">{title}</div>
          <p className="text-gray-700 text-base line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory;