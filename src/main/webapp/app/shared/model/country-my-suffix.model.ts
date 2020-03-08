import { Moment } from 'moment';

export interface ICountryMySuffix {
  id?: number;
  countryName?: string;
  createdDate?: Moment;
  regionId?: number;
}

export const defaultValue: Readonly<ICountryMySuffix> = {};
