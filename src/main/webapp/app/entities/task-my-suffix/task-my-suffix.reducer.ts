import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITaskMySuffix, defaultValue } from 'app/shared/model/task-my-suffix.model';

export const ACTION_TYPES = {
  FETCH_TASK_LIST: 'task/FETCH_TASK_LIST',
  FETCH_TASK: 'task/FETCH_TASK',
  CREATE_TASK: 'task/CREATE_TASK',
  UPDATE_TASK: 'task/UPDATE_TASK',
  DELETE_TASK: 'task/DELETE_TASK',
  RESET: 'task/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITaskMySuffix>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TaskMySuffixState = Readonly<typeof initialState>;

// Reducer

export default (state: TaskMySuffixState = initialState, action): TaskMySuffixState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TASK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TASK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TASK):
    case REQUEST(ACTION_TYPES.UPDATE_TASK):
    case REQUEST(ACTION_TYPES.DELETE_TASK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TASK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TASK):
    case FAILURE(ACTION_TYPES.CREATE_TASK):
    case FAILURE(ACTION_TYPES.UPDATE_TASK):
    case FAILURE(ACTION_TYPES.DELETE_TASK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TASK):
    case SUCCESS(ACTION_TYPES.UPDATE_TASK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TASK):
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

const apiUrl = 'api/tasks';

// Actions

export const getEntities: ICrudGetAllAction<ITaskMySuffix> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TASK_LIST,
  payload: axios.get<ITaskMySuffix>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ITaskMySuffix> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TASK,
    payload: axios.get<ITaskMySuffix>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITaskMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TASK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITaskMySuffix> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TASK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITaskMySuffix> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TASK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
