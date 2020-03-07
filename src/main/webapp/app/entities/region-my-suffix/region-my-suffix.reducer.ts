import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRegionMySuffix, defaultValue } from 'app/shared/model/region-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_REGION_LIST: 'region/FETCH_REGION_LIST',
  FETCH_REGION: 'region/FETCH_REGION',
  CREATE_REGION: 'region/CREATE_REGION',
  UPDATE_REGION: 'region/UPDATE_REGION',
  DELETE_REGION: 'region/DELETE_REGION',
  RESET: 'region/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRegionMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RegionMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: RegionMySuffixState = initialState, action): RegionMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REGION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REGION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_REGION):
    case REQUEST(ACTION_TYPES.UPDATE_REGION):
    case REQUEST(ACTION_TYPES.DELETE_REGION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_REGION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REGION):
    case FAILURE(ACTION_TYPES.CREATE_REGION):
    case FAILURE(ACTION_TYPES.UPDATE_REGION):
    case FAILURE(ACTION_TYPES.DELETE_REGION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_REGION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_REGION):
    case SUCCESS(ACTION_TYPES.UPDATE_REGION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_REGION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/regions';

// Actions

export const getEntities: ICrudGetAllAction<IRegionMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REGION_LIST,
  payload: axios.get<IRegionMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRegionMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REGION,
    payload: axios.get<IRegionMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRegionMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REGION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRegionMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REGION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRegionMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REGION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
