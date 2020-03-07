import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/region-my-suffix">
      Region My Suffix
    </MenuItem>
    <MenuItem icon="asterisk" to="/country-my-suffix">
      Country My Suffix
    </MenuItem>
    <MenuItem icon="asterisk" to="/location-my-suffix">
      Location My Suffix
    </MenuItem>
    <MenuItem icon="asterisk" to="/department-my-suffix">
      Department My Suffix
    </MenuItem>
    <MenuItem icon="asterisk" to="/task-my-suffix">
      Task My Suffix
    </MenuItem>
    <MenuItem icon="asterisk" to="/employee-my-suffix">
      Employee My Suffix
    </MenuItem>
    <MenuItem icon="asterisk" to="/job-my-suffix">
      Job My Suffix
    </MenuItem>
    <MenuItem icon="asterisk" to="/job-history-my-suffix">
      Job History My Suffix
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
