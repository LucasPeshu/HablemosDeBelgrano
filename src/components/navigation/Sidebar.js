import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { FaHome, FaInbox, FaBars, FaTimes } from 'react-icons/fa';
import logoHDB from '../../assets/img/hablemos-de-belgrano.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    { name: 'Dashboard', href: '/administrador/dashboard', icon: FaHome, current: false },
    { name: 'Noticias', href: '/administrador/news', icon: FaInbox, current: false },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Botón para mostrar el sidebar en pantallas pequeñas */}
      <div className="md:hidden p-4 bg-gray-100 flex justify-between items-center">
        <Link to="/admin/home">
          <img
            src={logoHDB}
            alt="Logo"
            className='h-10 w-10'
          />
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 transition-transform bg-gray-100 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static`}
        aria-label="Sidebar"
      >
        <div className="w-56 px-3 py-4 h-full bg-gray-100">
          <Link to="/administrador/home">
            <img
              src={logoHDB}
              alt="Logo"
              className="h-20 w-20 mx-auto mb-6"
            />
          </Link>

          <ul className="space-y-2 font-medium">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center p-2 text-sm font-medium rounded-lg'
                    )
                  }
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Fondo oscuro para cerrar el sidebar cuando está abierto en móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
