import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { getEntities as getTasks } from 'app/entities/task-my-suffix/task-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './job-my-suffix.reducer';
import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJobMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobMySuffixUpdate = (props: IJobMySuffixUpdateProps) => {
  const [idstask, setIdstask] = useState([]);
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { jobEntity, tasks, employees, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/job-my-suffix' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTasks();
    props.getEmployees();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...jobEntity,
        ...values,
        tasks: mapIdList(values.tasks)
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterCrudWithFilterApp.job.home.createOrEditLabel">Create or edit a Job</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : jobEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="job-my-suffix-id">ID</Label>
                  <AvInput id="job-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="jobTitleLabel" for="job-my-suffix-jobTitle">
                  Job Title
                </Label>
                <AvField id="job-my-suffix-jobTitle" type="text" name="jobTitle" />
              </AvGroup>
              <AvGroup>
                <Label id="minSalaryLabel" for="job-my-suffix-minSalary">
                  Min Salary
                </Label>
                <AvField id="job-my-suffix-minSalary" type="string" className="form-control" name="minSalary" />
              </AvGroup>
              <AvGroup>
                <Label id="maxSalaryLabel" for="job-my-suffix-maxSalary">
                  Max Salary
                </Label>
                <AvField id="job-my-suffix-maxSalary" type="string" className="form-control" name="maxSalary" />
              </AvGroup>
              <AvGroup>
                <Label for="job-my-suffix-task">Task</Label>
                <AvInput
                  id="job-my-suffix-task"
                  type="select"
                  multiple
                  className="form-control"
                  name="tasks"
                  value={jobEntity.tasks && jobEntity.tasks.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {tasks
                    ? tasks.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.title}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="job-my-suffix-employee">Employee</Label>
                <AvInput id="job-my-suffix-employee" type="select" className="form-control" name="employeeId">
                  <option value="" key="0" />
                  {employees
                    ? employees.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/job-my-suffix" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  tasks: storeState.task.entities,
  employees: storeState.employee.entities,
  jobEntity: storeState.job.entity,
  loading: storeState.job.loading,
  updating: storeState.job.updating,
  updateSuccess: storeState.job.updateSuccess
});

const mapDispatchToProps = {
  getTasks,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobMySuffixUpdate);
