import { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Context, HANDLE_REMOVE_SNACKBAR } from '../../Store/Store';
import Snackbar from './Snackbar';

/**
 * Wrapper component for Snackbars
 *
 * @component
 */
const SnackbarWrapper = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    state.snackbars?.forEach((snackbar) => {
      setTimeout(() => {
        dispatch({
          type: HANDLE_REMOVE_SNACKBAR,
          payload: snackbar.id,
        });
      }, 5000);
    });
  }, [state, dispatch]);
  return (
    <div className="snackbars_wrapper">
      {state.snackbars.map((sBar) => (
        <Snackbar
          key={uuidv4()}
          type={sBar.type}
          visible={sBar.visible}
          label={sBar.label}
          onClose={() => {
            dispatch({
              type: HANDLE_REMOVE_SNACKBAR,
              payload: sBar.id,
            });
          }}
        />
      ))}
    </div>
  );
};

export default SnackbarWrapper;
