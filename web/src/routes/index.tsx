import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Details from '../pages/Details';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/details/:id" component={Details} exact />
    </Switch>
  );
};

export default Routes;
