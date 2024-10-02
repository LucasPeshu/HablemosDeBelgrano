import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
  return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="mt-4 text-2xl text-gray-600">Página no encontrada</p>
          <p className="mt-2 text-gray-500">Lo sentimos, la página que estás buscando no existe.</p>
          <Link to="/" className="mt-6 inline-block px-6 py-3 text-white bg-sky-500 hover:bg-sky-600 rounded-md">
            Volver a la página principal
          </Link>
        </div>
      </div>
  );
}

export default Error404;