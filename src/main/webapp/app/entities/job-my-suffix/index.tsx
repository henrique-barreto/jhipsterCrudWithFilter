import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import JobMySuffix from './job-my-suffix';
import JobMySuffixDetail from './job-my-suffix-detail';
import JobMySuffixUpdate from './job-my-suffix-update';
import JobMySuffixDeleteDialog from './job-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={JobMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={JobMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={JobMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={JobMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={JobMySuffix} />
    </Switch>
  </>
);

export default Routes;
