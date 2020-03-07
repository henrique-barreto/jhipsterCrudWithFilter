import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DepartmentMySuffix from './department-my-suffix';
import DepartmentMySuffixDetail from './department-my-suffix-detail';
import DepartmentMySuffixUpdate from './department-my-suffix-update';
import DepartmentMySuffixDeleteDialog from './department-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DepartmentMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DepartmentMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DepartmentMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DepartmentMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={DepartmentMySuffix} />
    </Switch>
  </>
);

export default Routes;
