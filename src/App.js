import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import Login from './Login';
import CascadingDropdown from './CascadingDropdown';
import Morning_registration from './Morning_registration';
import Night_registration from './Night_registration';
import MainPage from './Pages/MainPage';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Dashboard from './Dashboard';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:3002/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <div className="header">
            <Header></Header>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/Morning" component={Morning_registration} />
              <PrivateRoute path="/Night" component={Night_registration} />
              <PrivateRoute path="/RetrieveData" component={MainPage} />
            </Switch>
          </div>
        </div >
      </BrowserRouter >


    </div >
  )
}

export default App;
