export interface ILocationMySuffix {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  countryId?: number;
}

export const defaultValue: Readonly<ILocationMySuffix> = {};
