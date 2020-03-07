import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { getEntities as getDepartments } from 'app/entities/department-my-suffix/department-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeMySuffixUpdate = (props: IEmployeeMySuffixUpdateProps) => {
  const [managerId, setManagerId] = useState('0');
  const [departmentId, setDepartmentId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeEntity, employees, departments, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee-my-suffix');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getEmployees();
    props.getDepartments();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.hireDate = convertDateTimeToServer(values.hireDate);

    if (errors.length === 0) {
      const entity = {
        ...employeeEntity,
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
          <h2 id="jhipsterCrudWithFilterApp.employee.home.createOrEditLabel">Create or edit a Employee</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-my-suffix-id">ID</Label>
                  <AvInput id="employee-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="employee-my-suffix-firstName">
                  First Name
                </Label>
                <AvField id="employee-my-suffix-firstName" type="text" name="firstName" />
                <UncontrolledTooltip target="firstNameLabel">The firstname attribute.</UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="employee-my-suffix-lastName">
                  Last Name
                </Label>
                <AvField id="employee-my-suffix-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="employee-my-suffix-email">
                  Email
                </Label>
                <AvField id="employee-my-suffix-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="employee-my-suffix-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="employee-my-suffix-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="hireDateLabel" for="employee-my-suffix-hireDate">
                  Hire Date
                </Label>
                <AvInput
                  id="employee-my-suffix-hireDate"
                  type="datetime-local"
                  className="form-control"
                  name="hireDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.employeeEntity.hireDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="salaryLabel" for="employee-my-suffix-salary">
                  Salary
                </Label>
                <AvField id="employee-my-suffix-salary" type="string" className="form-control" name="salary" />
              </AvGroup>
              <AvGroup>
                <Label id="commissionPctLabel" for="employee-my-suffix-commissionPct">
                  Commission Pct
                </Label>
                <AvField id="employee-my-suffix-commissionPct" type="string" className="form-control" name="commissionPct" />
              </AvGroup>
              <AvGroup>
                <Label for="employee-my-suffix-manager">Manager</Label>
                <AvInput id="employee-my-suffix-manager" type="select" className="form-control" name="managerId">
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
              <AvGroup>
                <Label for="employee-my-suffix-department">Department</Label>
                <AvInput id="employee-my-suffix-department" type="select" className="form-control" name="departmentId">
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
              <Button tag={Link} id="cancel-save" to="/employee-my-suffix" replace color="info">
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
  employees: storeState.employee.entities,
  departments: storeState.department.entities,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getDepartments,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMySuffixUpdate);
