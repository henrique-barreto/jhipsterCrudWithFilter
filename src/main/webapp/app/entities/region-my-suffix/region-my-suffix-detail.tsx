import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './region-my-suffix.reducer';
import { IRegionMySuffix } from 'app/shared/model/region-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRegionMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RegionMySuffixDetail = (props: IRegionMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { regionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Region [<b>{regionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="regionName">Region Name</span>
          </dt>
          <dd>{regionEntity.regionName}</dd>
        </dl>
        <Button tag={Link} to="/region-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/region-my-suffix/${regionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ region }: IRootState) => ({
  regionEntity: region.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegionMySuffixDetail);
