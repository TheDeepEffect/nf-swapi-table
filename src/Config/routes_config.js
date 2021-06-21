/**
 * @description the aim to create this config is to have
 *  a single source of truth for the routes defination.
 *  the reason we are not importing the components here
 *  for the property `component` is to avoid circular
 *  import dependencies error.
 *  components will be assigned in config/routes.ts
 */
const routes = {
  home: {
    id: 'home',
    name: 'Home',
    description: 'Home page with SWAPI people list',
    path: '/',
    path_string: () => '/',
    exact: true,
    component: undefined,
  },
  search: {
    id: 'search',
    name: 'Search',
    description: 'Search page with people SWAPI',
    path: '/search',
    path_string: () => '/search',
    exact: true,
    component: undefined,
  },
};

export default routes;
