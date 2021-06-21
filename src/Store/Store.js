import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const HANDLE_SNACKBAR = 'HANDLE_SNACKBAR';
export const HANDLE_REMOVE_SNACKBAR = 'HANDLE_REMOVE_SNACKBAR';
const snackbarInitialState = {
  snackbars: [],
};

export const reducer = (state, action) => {
  const { snackbars } = state;
  switch (action.type) {
    case HANDLE_SNACKBAR:
      return {
        ...state,
        snackbars: [
          ...snackbars,
          {
            id: Date.now().toString(),
            ...action.payload,
          },
        ],
      };
    case HANDLE_REMOVE_SNACKBAR:
      return {
        ...state,
        snackbars: snackbars.filter((value) => value.id !== action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};

/**
 *
 * Redux like store setup with useReducer and context API
 * to handle global error state
 * @component
 */
export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, snackbarInitialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

Store.propTypes = {
  children: PropTypes.element,
};
export const Context = createContext(snackbarInitialState);
