import { Moment } from 'moment';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IJobHistoryMySuffix {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  language?: Language;
  jobId?: number;
  departmentId?: number;
  employeeId?: number;
}

export const defaultValue: Readonly<IJobHistoryMySuffix> = {};
