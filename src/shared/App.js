import React, { Component } from "react";
import routes from "./routes";
import { Route, Switch } from "react-router-dom";
import NoMatch from "./NoMatch";
import NavBar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          {routes.map(({ path, exact, component: C, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={props => <C {...props} {...rest} />}
            />
          ))}
          <Route render={props => <NoMatch {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
