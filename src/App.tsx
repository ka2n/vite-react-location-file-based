import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import routes from './route-loader';

const location = new ReactLocation();

function App() {
  return (
    <div className="App">
      <Router location={location} routes={routes}>
        <Outlet />
      </Router>
    </div>
  );
}

export default App;
