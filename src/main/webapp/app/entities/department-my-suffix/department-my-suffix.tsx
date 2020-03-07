import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './department-my-suffix.reducer';
import { IDepartmentMySuffix } from 'app/shared/model/department-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDepartmentMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DepartmentMySuffix = (props: IDepartmentMySuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { departmentList, match, loading } = props;
  return (
    <div>
      <h2 id="department-my-suffix-heading">
        Departments
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Department
        </Link>
      </h2>
      <div className="table-responsive">
        {departmentList && departmentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Department Name</th>
                <th>Location</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {departmentList.map((department, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${department.id}`} color="link" size="sm">
                      {department.id}
                    </Button>
                  </td>
                  <td>{department.departmentName}</td>
                  <td>
                    {department.locationId ? <Link to={`location-my-suffix/${department.locationId}`}>{department.locationId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${department.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${department.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${department.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Departments found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ department }: IRootState) => ({
  departmentList: department.entities,
  loading: department.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentMySuffix);
