import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import PageHome from '../components/pages/PageHome/PageHome';
import PageSignIn from '../components/pages/PageSignIn/PageSignIn';
import UserContextProvider from './UserContextProvider';
import PageCreate from '../components/pages/PageCreate/PageCreate';
import UserBtn from '../components/organisms/UserBtn/UserBtn';

function App() {
  return (
    <UserContextProvider>
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
                <UserBtn />
              </li>
            </ul>
          </nav>
        </div>
        <Switch>

          <Route path="/sign-in">
            <PageSignIn />
          </Route>

          <Route path="/create">
            <PageCreate />
          </Route>

          <Route path="/">
            <PageHome />
          </Route>

        </Switch>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
