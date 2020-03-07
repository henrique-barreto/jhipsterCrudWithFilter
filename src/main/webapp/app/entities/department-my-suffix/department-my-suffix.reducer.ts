import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDepartmentMySuffix, defaultValue } from 'app/shared/model/department-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_DEPARTMENT_LIST: 'department/FETCH_DEPARTMENT_LIST',
  FETCH_DEPARTMENT: 'department/FETCH_DEPARTMENT',
  CREATE_DEPARTMENT: 'department/CREATE_DEPARTMENT',
  UPDATE_DEPARTMENT: 'department/UPDATE_DEPARTMENT',
  DELETE_DEPARTMENT: 'department/DELETE_DEPARTMENT',
  RESET: 'department/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDepartmentMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DepartmentMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: DepartmentMySuffixState = initialState, action): DepartmentMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DEPARTMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DEPARTMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DEPARTMENT):
    case REQUEST(ACTION_TYPES.UPDATE_DEPARTMENT):
    case REQUEST(ACTION_TYPES.DELETE_DEPARTMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DEPARTMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DEPARTMENT):
    case FAILURE(ACTION_TYPES.CREATE_DEPARTMENT):
    case FAILURE(ACTION_TYPES.UPDATE_DEPARTMENT):
    case FAILURE(ACTION_TYPES.DELETE_DEPARTMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEPARTMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DEPARTMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DEPARTMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_DEPARTMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DEPARTMENT):
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

const apiUrl = 'api/departments';

// Actions

export const getEntities: ICrudGetAllAction<IDepartmentMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DEPARTMENT_LIST,
  payload: axios.get<IDepartmentMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDepartmentMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DEPARTMENT,
    payload: axios.get<IDepartmentMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDepartmentMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DEPARTMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDepartmentMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DEPARTMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDepartmentMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DEPARTMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
