import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import routes from './Config/routes';
import { Store } from './Store/Store';

/**
 * App Component with Store Context and Routes
 *
 * @component
 */
function App() {
  return (
    <Router>
      <Store>
        <div className="App">
          <NavBar />
          <Switch>
            {Object.keys(routes).map((key) => {
              const value = routes[key];
              return <Route {...value} key={key} />;
            })}
          </Switch>
        </div>
      </Store>
    </Router>
  );
}

export default App;
