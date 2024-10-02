import {
  GET_TRANSMISSION_LINK_SUCCESS,
  GET_TRANSMISSION_LINK_FAIL,
  EDIT_TRANSMISSION_LINK_SUCCESS,
  EDIT_TRANSMISSION_LINK_FAIL
} from 'redux/actions/transmission/types';

const initialState = {
  link: null,
  error: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
      case GET_TRANSMISSION_LINK_SUCCESS:
          return {
              ...state,
              link: payload,
              error: null
          };
      case GET_TRANSMISSION_LINK_FAIL:
          return {
              ...state,
              link: null,
              error: 'Failed to get transmission link'
          };
      case EDIT_TRANSMISSION_LINK_SUCCESS:
          return {
              ...state,
              link: payload,
              error: null
          };
      case EDIT_TRANSMISSION_LINK_FAIL:
          return {
              ...state,
              error: 'Failed to edit transmission link'
          };
      default:
          return state;
  }
}