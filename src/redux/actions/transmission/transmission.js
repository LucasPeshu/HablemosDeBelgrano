import axios from 'axios';
import {
    GET_TRANSMISSION_LINK_SUCCESS,
    GET_TRANSMISSION_LINK_FAIL,
    EDIT_TRANSMISSION_LINK_SUCCESS,
    EDIT_TRANSMISSION_LINK_FAIL
} from 'redux/actions/transmission/types';

// Acción para obtener el enlace de transmisión
export const getTransmissionLink = () => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/transmission-link/1/`);
        dispatch({
            type: GET_TRANSMISSION_LINK_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_TRANSMISSION_LINK_FAIL,
            payload: err.response ? err.response.data : 'Error al obtener el enlace de transmisión'
        });
    }
};

// Acción para editar el enlace de transmisión
export const editTransmissionLink = (link, config) => async dispatch => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/transmission-link/edit/1/`, { link }, config);
        dispatch({
            type: EDIT_TRANSMISSION_LINK_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EDIT_TRANSMISSION_LINK_FAIL,
            payload: err.response ? err.response.data : 'Error al editar el enlace de transmisión'
        });
    }
};

