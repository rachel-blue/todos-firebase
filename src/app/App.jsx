import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import PageHome from '../components/pages/PageHome/PageHome';
import PageSignIn from '../components/pages/PageSignIn/PageSignIn';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-in"
              >
                Sign In
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>

        <Route path="/sign-in">
          <PageSignIn />
        </Route>

        <Route path="/">
          <PageHome />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
