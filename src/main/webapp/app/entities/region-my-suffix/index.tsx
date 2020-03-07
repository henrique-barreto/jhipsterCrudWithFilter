import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RegionMySuffix from './region-my-suffix';
import RegionMySuffixDetail from './region-my-suffix-detail';
import RegionMySuffixUpdate from './region-my-suffix-update';
import RegionMySuffixDeleteDialog from './region-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RegionMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RegionMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RegionMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RegionMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={RegionMySuffix} />
    </Switch>
  </>
);

export default Routes;
