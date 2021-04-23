import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Events from './screens/Events';
import EventForm from './components/events/EventForm';
import ProfileForm from './components/users/ProfileForm';
import MessageForm from './components/notifications/MessageForm';
import MapScreen from './screens/MapScreen';


import Notifications from './screens/Notifications';
import Reservations from './screens/Reservations';

import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import AuthStore from './contexts/AuthStore';

import Error from './screens/Error';
import AuthCallback from './screens/AuthCallback';
import './App.css'
import CardScreen from './screens/CardScreen';


function App() {

  return (
    <Router>
      <AuthStore>
        <Navbar />
        <div className='bg'>
          <div className="container pt-5 pb-5" >
            <Switch>
              <Route exact path="/authenticate/google/cb" component={AuthCallback} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/update-profile" component={ProfileForm} />
              <Route exact path="/create-event" component={EventForm} />
              <Route exact path="/events" component={Events} />
              <Route exact path="/map" component={MapScreen} />
              <Route exact path="/create-message" component={MessageForm} />
              <Route exact path="/notifications-list" component={Notifications} />
              <Route exact path="/reservations-list" component={Reservations} />
              <Route exact path="/reservation/:id" component={Reservations} />
              <Route exact path="/payment" component={CardScreen} />

              <Route exact path="/404" component={() => <Error code={404} />} />
              <Route exact path="/403" component={() => <Error code={403} />} />

              <Redirect to="/events" />
            </Switch>
          </div>
        </div>
      </AuthStore>
    </Router>
  );
}

export default App;
