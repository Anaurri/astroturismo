import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import Events from './screens/Events';
import Login from './screens/Register';
import Register from './screens/Login';
import AuthStore from './contexts/AuthStore';
import Error from './screens/Error';
import AuthCallback from './screens/AuthCallback';
import bg from '../src/images/background/background_2.jpg'


// function App() {
//   return (
//     <Router>
//         <div className="container pt-4 pb-5">
//           <Switch>
        
//             <Route exact path="/events" component={Events} />
//             <Redirect to="/events" />
//           </Switch>
//         </div>
//     </Router>
//   );
// }

// export default App;
function App() {
  return (
    <Router>
      <AuthStore>
        <Navbar />
        <div className="container pt-4 pb-5 App-bg" >
          <Switch>
            <Route exact path="/authenticate/google/cb" component={AuthCallback}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            
            <Route exact path="/events" component={Events} />
            
            <Route exact path="/404" component={() => <Error code={404} />} />
            <Route exact path="/403" component={() => <Error code={403} />} />

            <Redirect to="/events" />
          </Switch>
        </div>
      </AuthStore>
    </Router>
  );
}

export default App;
