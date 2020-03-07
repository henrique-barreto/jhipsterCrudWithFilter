import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country-my-suffix.reducer';
import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryMySuffixDetail = (props: ICountryMySuffixDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { countryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Country [<b>{countryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="countryName">Country Name</span>
          </dt>
          <dd>{countryEntity.countryName}</dd>
          <dt>Region</dt>
          <dd>{countryEntity.regionId ? countryEntity.regionId : ''}</dd>
        </dl>
        <Button tag={Link} to="/country-my-suffix" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/country-my-suffix/${countryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ country }: IRootState) => ({
  countryEntity: country.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryMySuffixDetail);
