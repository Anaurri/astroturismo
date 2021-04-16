import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Events from './screens/Events';
import Navbar from './components/nav/Navbar';


function App() {
  return (
    <Router>
        <div className="container pt-4 pb-5">
          <Switch>
        
            <Route exact path="/events" component={Events} />
            <Redirect to="/events" />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
