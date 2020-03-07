import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import region, {
  RegionMySuffixState
} from 'app/entities/region-my-suffix/region-my-suffix.reducer';
// prettier-ignore
import country, {
  CountryMySuffixState
} from 'app/entities/country-my-suffix/country-my-suffix.reducer';
// prettier-ignore
import location, {
  LocationMySuffixState
} from 'app/entities/location-my-suffix/location-my-suffix.reducer';
// prettier-ignore
import department, {
  DepartmentMySuffixState
} from 'app/entities/department-my-suffix/department-my-suffix.reducer';
// prettier-ignore
import task, {
  TaskMySuffixState
} from 'app/entities/task-my-suffix/task-my-suffix.reducer';
// prettier-ignore
import employee, {
  EmployeeMySuffixState
} from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
// prettier-ignore
import job, {
  JobMySuffixState
} from 'app/entities/job-my-suffix/job-my-suffix.reducer';
// prettier-ignore
import jobHistory, {
  JobHistoryMySuffixState
} from 'app/entities/job-history-my-suffix/job-history-my-suffix.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly region: RegionMySuffixState;
  readonly country: CountryMySuffixState;
  readonly location: LocationMySuffixState;
  readonly department: DepartmentMySuffixState;
  readonly task: TaskMySuffixState;
  readonly employee: EmployeeMySuffixState;
  readonly job: JobMySuffixState;
  readonly jobHistory: JobHistoryMySuffixState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  region,
  country,
  location,
  department,
  task,
  employee,
  job,
  jobHistory,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
