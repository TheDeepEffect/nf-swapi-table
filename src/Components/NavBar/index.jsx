import { Link } from 'react-router-dom';
import SnackbarWrapper from '../Snackbar/SnackbarWrapper';
import './NavBar.css';

/**
 * Navigation bar consiting two Links (Home , Search)
 *
 * @component
 */
const NavBar = () => (
  <>
    <nav className="nav_bar">
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
      <div className="logo">SWAPI</div>
    </nav>
    <SnackbarWrapper />
  </>
);

export default NavBar;
