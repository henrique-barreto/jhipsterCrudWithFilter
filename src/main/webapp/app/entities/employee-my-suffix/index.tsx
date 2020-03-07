import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeMySuffix from './employee-my-suffix';
import EmployeeMySuffixDetail from './employee-my-suffix-detail';
import EmployeeMySuffixUpdate from './employee-my-suffix-update';
import EmployeeMySuffixDeleteDialog from './employee-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeMySuffix} />
    </Switch>
  </>
);

export default Routes;
