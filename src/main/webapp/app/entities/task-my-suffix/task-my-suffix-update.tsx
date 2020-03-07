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
import { getEntity, updateEntity, createEntity, reset } from './task-my-suffix.reducer';
import { ITaskMySuffix } from 'app/shared/model/task-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITaskMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TaskMySuffixUpdate = (props: ITaskMySuffixUpdateProps) => {
  const [jobId, setJobId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { taskEntity, jobs, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/task-my-suffix');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getJobs();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...taskEntity,
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
          <h2 id="jhipsterCrudWithFilterApp.task.home.createOrEditLabel">Create or edit a Task</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : taskEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="task-my-suffix-id">ID</Label>
                  <AvInput id="task-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="task-my-suffix-title">
                  Title
                </Label>
                <AvField id="task-my-suffix-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="task-my-suffix-description">
                  Description
                </Label>
                <AvField id="task-my-suffix-description" type="text" name="description" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/task-my-suffix" replace color="info">
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
  taskEntity: storeState.task.entity,
  loading: storeState.task.loading,
  updating: storeState.task.updating,
  updateSuccess: storeState.task.updateSuccess
});

const mapDispatchToProps = {
  getJobs,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaskMySuffixUpdate);
