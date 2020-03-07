import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

export interface IDepartmentMySuffix {
  id?: number;
  departmentName?: string;
  locationId?: number;
  employees?: IEmployeeMySuffix[];
}

export const defaultValue: Readonly<IDepartmentMySuffix> = {};
