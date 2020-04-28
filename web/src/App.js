import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { CardPage } from "./pages/CardPage";
import { AdminPage } from "./pages/AdminPage";
import { SignInPage } from "./pages/SignInPage";
import { ROUTES } from "./navigation/routes";
import { AdminCardPage } from "./pages/AdminCardPage";

const ProtectedRoute = ({ predicate, redirect, children, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      predicate ? (
        children(props)
      ) : (
        <Redirect
          to={{ pathname: redirect, state: { from: props.location } }}
        />
      )
    }
  />
);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.home} component={CardPage} />
        <ProtectedRoute
          predicate={true}
          redirect={ROUTES.home}
          path={ROUTES.signin}
        >
          {props => <SignInPage {...props} />}
        </ProtectedRoute>
        <ProtectedRoute
          predicate={true}
          redirect={ROUTES.home}
          exact
          path={ROUTES.admin}
        >
          {props => <AdminPage {...props} />}
        </ProtectedRoute>
        <ProtectedRoute
          predicate={true}
          redirect={ROUTES.home}
          exact
          path={ROUTES.adminCard}
        >
          {props => <AdminCardPage {...props} />}
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
