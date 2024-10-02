import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const NewsCard = ({ data, index }) => {
  return (
    <li>
      <Link to={`/administrador/news/${data.slug}`}
        onMouseEnter={() => {
          const title = document.getElementById(`title` + data.id);
          title.classList.add('text-sky-500');
        }}
        onMouseLeave={() => {
          const title = document.getElementById(`title` + data.id);
          title.classList.remove('text-sky-500');
        }}
        className="block">
        <div className="overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img className="h-56 w-full object-cover" src={'https://res.cloudinary.com/diadzh30o/' + data.thumbnail} alt={data.title} />
          <div className="px-6 py-4">
            <div id={`title` + data.id} className="font-bold text-xl mb-2 line-clamp-2">{data.title}</div>
            <p className="text-gray-700 text-base line-clamp-2">
              {data.description}
            </p>
            <div className="mt-2">
              {
                data.category &&
                <>
                  <span className="hover:text-sky-500 mx-1 font-medium text-gray-800 text-sm">{data.category.name}</span> <span className="text-gray-300">&middot;</span>
                </>
              }
              <span className="mt-2 ml-2 mr-1 font-medium text-gray-800 text-sm">{moment(data.published).format('LL')}</span> <span className="text-gray-300">&middot;</span>
              <span className="mt-2 mx-2 font-medium text-gray-800 text-sm">{data.status}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default NewsCard;