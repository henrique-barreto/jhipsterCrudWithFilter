import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountryMySuffix } from 'app/shared/model/country-my-suffix.model';
import { getEntities as getCountries } from 'app/entities/country-my-suffix/country-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './location-my-suffix.reducer';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationMySuffixUpdate = (props: ILocationMySuffixUpdateProps) => {
  const [countryId, setCountryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { locationEntity, countries, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/location-my-suffix');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCountries();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...locationEntity,
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
          <h2 id="jhipsterCrudWithFilterApp.location.home.createOrEditLabel">Create or edit a Location</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : locationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="location-my-suffix-id">ID</Label>
                  <AvInput id="location-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="streetAddressLabel" for="location-my-suffix-streetAddress">
                  Street Address
                </Label>
                <AvField id="location-my-suffix-streetAddress" type="text" name="streetAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="location-my-suffix-postalCode">
                  Postal Code
                </Label>
                <AvField id="location-my-suffix-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="location-my-suffix-city">
                  City
                </Label>
                <AvField id="location-my-suffix-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="location-my-suffix-stateProvince">
                  State Province
                </Label>
                <AvField id="location-my-suffix-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label for="location-my-suffix-country">Country</Label>
                <AvInput id="location-my-suffix-country" type="select" className="form-control" name="countryId">
                  <option value="" key="0" />
                  {countries
                    ? countries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/location-my-suffix" replace color="info">
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
  countries: storeState.country.entities,
  locationEntity: storeState.location.entity,
  loading: storeState.location.loading,
  updating: storeState.location.updating,
  updateSuccess: storeState.location.updateSuccess
});

const mapDispatchToProps = {
  getCountries,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationMySuffixUpdate);
