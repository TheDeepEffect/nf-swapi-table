import HomePage from '../Pages/HomePage';
import SearchPage from '../Pages/SearchPage';
import routesConfig from './routes_config';

/**
 *
 * @description Mapping componenets with routes
 */
const routes = {
  [routesConfig.home.id]: {
    ...routesConfig.home,
    component: HomePage,
  },
  [routesConfig.search.id]: {
    ...routesConfig.search,
    component: SearchPage,
  },
};

export default routes;
