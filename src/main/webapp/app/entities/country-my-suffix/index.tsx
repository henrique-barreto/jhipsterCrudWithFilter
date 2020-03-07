import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CountryMySuffix from './country-my-suffix';
import CountryMySuffixDetail from './country-my-suffix-detail';
import CountryMySuffixUpdate from './country-my-suffix-update';
import CountryMySuffixDeleteDialog from './country-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CountryMySuffixDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CountryMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CountryMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CountryMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={CountryMySuffix} />
    </Switch>
  </>
);

export default Routes;
