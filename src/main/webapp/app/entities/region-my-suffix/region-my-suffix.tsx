import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './region-my-suffix.reducer';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRegionMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RegionMySuffix = (props: IRegionMySuffixProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { regionList, match, loading } = props;
  return (
    <div>
      <h2 id="region-my-suffix-heading">
        Regions
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Region
        </Link>
      </h2>
      <div className="table-responsive">
        {regionList && regionList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Region Name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {regionList.map((region, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${region.id}`} color="link" size="sm">
                      {region.id}
                    </Button>
                  </td>
                  <td>{region.regionName}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${region.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${region.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${region.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Regions found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ region }: IRootState) => ({
  regionList: region.entities,
  loading: region.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegionMySuffix);
