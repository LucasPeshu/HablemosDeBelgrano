import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { check_authenticated, load_user, login, refresh } from "redux/actions/auth/auth";
import LayoutDashboard from "hocs/layout/LayoutDashboard";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import logoHDB from '../../../assets/img/hablemos-de-belgrano.png';

function HomeDashboard({
  login,
  isAuthenticated,
  loading,
  refresh,
  check_authenticated,
  load_user,
}){

  useEffect(()=>{
      isAuthenticated ? <></>:
      <>
      {refresh()}
      {check_authenticated()}
      {load_user()}
      </>
  },[])

  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

  const { 
      email,
      password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = e => {
      e.preventDefault();
      login(email, password)
  }

  if(isAuthenticated){
      return <Navigate to='/administrador/dashboard'/>
  }

  return (
    <LayoutDashboard>
      <div className="p-4 mx-auto h-screen">
        <div>
          <div className="w-96">
            <div>
              <img
                src={logoHDB}
                alt="Logo"
                className='mx-auto h-20 w-auto'
              />
            </div>
            <form onSubmit={e=>{onSubmit(e)}} className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div className="pb-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    value={email}
                    onChange={e=>onChange(e)}
                    type="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Dirección email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    value={password}
                    onChange={e=>onChange(e)}
                    type="password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Contraseña"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link to="/administrador/forgot_password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Perdiste tu contraseña?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}

const mapStateToProps=state=>({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps,{
  login,
  refresh,
  check_authenticated,
  load_user,
}) (HomeDashboard)