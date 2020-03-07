import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJobMySuffix } from 'app/shared/model/job-my-suffix.model';
import { getEntities as getJobs } from 'app/entities/job-my-suffix/job-my-suffix.reducer';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { getEntities as getDepartments } from 'app/entities/department-my-suffix/department-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './job-history-my-suffix.reducer';
import { IJobHistoryMySuffix } from 'app/shared/model/job-history-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJobHistoryMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobHistoryMySuffixUpdate = (props: IJobHistoryMySuffixUpdateProps) => {
  const [jobId, setJobId] = useState('0');
  const [departmentId, setDepartmentId] = useState('0');
  const [employeeId, setEmployeeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { jobHistoryEntity, jobs, departments, employees, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/job-history-my-suffix');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getJobs();
    props.getDepartments();
    props.getEmployees();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...jobHistoryEntity,
        ...values
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
          <h2 id="jhipsterCrudWithFilterApp.jobHistory.home.createOrEditLabel">Create or edit a JobHistory</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : jobHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="job-history-my-suffix-id">ID</Label>
                  <AvInput id="job-history-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startDateLabel" for="job-history-my-suffix-startDate">
                  Start Date
                </Label>
                <AvInput
                  id="job-history-my-suffix-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.jobHistoryEntity.startDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="job-history-my-suffix-endDate">
                  End Date
                </Label>
                <AvInput
                  id="job-history-my-suffix-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.jobHistoryEntity.endDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="languageLabel" for="job-history-my-suffix-language">
                  Language
                </Label>
                <AvInput
                  id="job-history-my-suffix-language"
                  type="select"
                  className="form-control"
                  name="language"
                  value={(!isNew && jobHistoryEntity.language) || 'FRENCH'}
                >
                  <option value="FRENCH">FRENCH</option>
                  <option value="ENGLISH">ENGLISH</option>
                  <option value="SPANISH">SPANISH</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="job-history-my-suffix-job">Job</Label>
                <AvInput id="job-history-my-suffix-job" type="select" className="form-control" name="jobId">
                  <option value="" key="0" />
                  {jobs
                    ? jobs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="job-history-my-suffix-department">Department</Label>
                <AvInput id="job-history-my-suffix-department" type="select" className="form-control" name="departmentId">
                  <option value="" key="0" />
                  {departments
                    ? departments.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="job-history-my-suffix-employee">Employee</Label>
                <AvInput id="job-history-my-suffix-employee" type="select" className="form-control" name="employeeId">
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
              <Button tag={Link} id="cancel-save" to="/job-history-my-suffix" replace color="info">
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
  jobs: storeState.job.entities,
  departments: storeState.department.entities,
  employees: storeState.employee.entities,
  jobHistoryEntity: storeState.jobHistory.entity,
  loading: storeState.jobHistory.loading,
  updating: storeState.jobHistory.updating,
  updateSuccess: storeState.jobHistory.updateSuccess
});

const mapDispatchToProps = {
  getJobs,
  getDepartments,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryMySuffixUpdate);
