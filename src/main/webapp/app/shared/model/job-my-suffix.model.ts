import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';

export interface IJobMySuffix {
  id?: number;
  jobTitle?: string;
  minSalary?: number;
  maxSalary?: number;
  tasks?: ITaskMySuffix[];
  employeeId?: number;
}

export const defaultValue: Readonly<IJobMySuffix> = {};
