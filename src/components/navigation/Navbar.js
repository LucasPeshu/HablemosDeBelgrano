import logoHDB from '../../assets/img/hablemos-de-belgrano.png';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

import { connect } from 'react-redux';
import { get_categories } from 'redux/actions/categories/categories'; // Importa la acción

function Navbar({ categories, get_categories }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    get_categories(); // Despacha la acción cuando el componente se monte
  }, [get_categories]);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="px-4 sm:px-6 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          <img
            src={logoHDB}
            alt="Logo"
            width={80}
            height={80}
          />
        </Link>
        <div className="hidden lg:flex space-x-4">
          {categories && categories.map((category, index) => (
            <NavLink
              key={index}
              to={`/${category.slug}`}
              className="text-lg font-medium text-gray-900 hover:text-sky-500"
            >
              {category.name}
            </NavLink>
          ))}
        </div>
        <div className="lg:hidden flex items-center">
          {isOpen ? (
            <FaTimes className="text-xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
      </div>

      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col items-center bg-white py-3">
          {categories && categories.map((category, index) => (
            <li key={index} className="hover:bg-gray-200 p-2 rounded-lg w-full text-center">
              <NavLink
                to={`/${category.slug}`}
                className="text-lg font-medium text-gray-900 hover:text-sky-500"
                onClick={toggleMenu}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
});

export default connect(mapStateToProps, { get_categories })(Navbar);