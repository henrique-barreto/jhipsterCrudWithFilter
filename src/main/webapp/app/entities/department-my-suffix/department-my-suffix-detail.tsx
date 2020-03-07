import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './department-my-suffix.reducer';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartmentMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DepartmentMySuffixDetail = (props: IDepartmentMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { departmentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Department [<b>{departmentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="departmentName">Department Name</span>
          </dt>
          <dd>{departmentEntity.departmentName}</dd>
          <dt>Location</dt>
          <dd>{departmentEntity.locationId ? departmentEntity.locationId : ''}</dd>
        </dl>
        <Button tag={Link} to="/department-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/department-my-suffix/${departmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ department }: IRootState) => ({
  departmentEntity: department.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentMySuffixDetail);
