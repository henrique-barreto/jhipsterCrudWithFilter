import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LocationMySuffix from './location-my-suffix';
import LocationMySuffixDetail from './location-my-suffix-detail';
import LocationMySuffixUpdate from './location-my-suffix-update';
import LocationMySuffixDeleteDialog from './location-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LocationMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LocationMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LocationMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LocationMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={LocationMySuffix} />
    </Switch>
  </>
);

export default Routes;
