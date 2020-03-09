import { Moment } from 'moment';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ICountryMySuffix {
  id?: number;
  countryName?: string;
  createdDate?: Moment;
  language?: Language;
  regionId?: number;
}

export const defaultValue: Readonly<ICountryMySuffix> = {};
