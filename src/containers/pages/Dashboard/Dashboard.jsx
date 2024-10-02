import { connect } from "react-redux";
import LayoutDashboard from "hocs/layout/LayoutDashboard";
import { editTransmissionLink, getTransmissionLink } from 'redux/actions/transmission/transmission';
import { useEffect, useState } from "react";

function Dashboard({ link, getTransmissionLink, isAuthenticated, editTransmissionLink }) {
  useEffect(() => {
    getTransmissionLink();
  }, [getTransmissionLink]);

  const [updatelink, setUpdateLink] = useState(false);

  const [formData, setFormData] = useState({
    new_link: '',
  });

  const { new_link } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
    };

    // Llamada a la acción editTransmissionLink con el nuevo link y la configuración de los encabezados
    editTransmissionLink(new_link, config);

    // Ocultar el formulario de edición
    setUpdateLink(false);
  };

  return (
    <LayoutDashboard>
      {isAuthenticated ? 
      <>
      <div className="p-4 h-screen">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al dashboard</p>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          {link && link.link ? (
            <>
              <dt className="text-sm font-medium text-gray-500">Editar link youtube</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {updatelink ? (
                  <form onSubmit={onSubmit} className="flex flex-col sm:flex-row w-full items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex-grow w-full">
                      <input
                        value={new_link}
                        onChange={onChange}
                        name="new_link"
                        type="text"
                        className="border border-gray-300 rounded-lg w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Ingrese un nuevo link"
                        required
                      />
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpdateLink(false)}
                        className="rounded-md bg-gray-200 text-gray-700 font-medium px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="w-screen flex justify-between gap-2">
                    <p>{link.link}</p>
                    <button
                      onClick={() => setUpdateLink(true)}
                      type="button"
                      className="rounded-md bg-gray-700 text-white font-medium px-4 h-10 py-2 hover:bg-gray-800"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </dd>
            </>
          ) : (
            <p>No hay link</p>
          )}
        </div>
      </div>
      </> 
      :
      <div className="h-screen p-4">Debes iniciar sesión para ver esta página</div>}
      
    </LayoutDashboard>
  );
}

const mapStateToProps = (state) => ({
  link: state.transmission.link || null,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getTransmissionLink, editTransmissionLink })(Dashboard);
