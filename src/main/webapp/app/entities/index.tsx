import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RegionMySuffix from './region-my-suffix';
import CountryMySuffix from './country-my-suffix';
import LocationMySuffix from './location-my-suffix';
import DepartmentMySuffix from './department-my-suffix';
import TaskMySuffix from './task-my-suffix';
import EmployeeMySuffix from './employee-my-suffix';
import JobMySuffix from './job-my-suffix';
import JobHistoryMySuffix from './job-history-my-suffix';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}region-my-suffix`} component={RegionMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}country-my-suffix`} component={CountryMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}location-my-suffix`} component={LocationMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}department-my-suffix`} component={DepartmentMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}task-my-suffix`} component={TaskMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}employee-my-suffix`} component={EmployeeMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}job-my-suffix`} component={JobMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}job-history-my-suffix`} component={JobHistoryMySuffix} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
