/**
 * Displays the sidebar
 */

import React, {
  useState,
  useContext,
} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';
import numeral from 'numeral';

import Onboarding from '../onboarding';
import whiteHydroDrop from '../../common/img/hydro_white_drop.png';

import SnowflakeContext from '../../contexts/snowflakeContext';

import {
  fromWei,
} from '../../services/format';

import {
  network,
} from '../../common/config/network.json';

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const snowflakeContext = useContext(SnowflakeContext);

  const {
    ein,
    snowflakeBalance,
    networkId,
    hasProvider,
  } = snowflakeContext;

  function displayButton() {
    if (ein) {
      return (
        <div>
          <NavItem>
            <NavLink tag={RouterNavLink} exact to="/wallet">
              <Badge className="sidebar__badge" color="secondary" pill>
                <img src={whiteHydroDrop} alt="Hydro Drop" className="sidebar__hydro-drop" />
              </Badge>
            </NavLink>
          </NavItem>
        </div>
      );
    }

    if (hasProvider && networkId !== network) {
      return (
        <div className="onboardingButton">
          <Button color="warning">
            Wrong network
          </Button>
        </div>
      );
    }

    return (
      <div className="onboardingButton">
        <Onboarding
          step={hasProvider ? 'hydroId' : 'provider'}
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          hasProvider={hasProvider}
          networkId={networkId}
        />
        <Button color="primary" onClick={() => setIsModalOpen(!isModalOpen)}>
          Create Account
        </Button>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="py-4">
        <Nav vertical>
          {displayButton()}

        </Nav>
      </div>

    </div>
  );
}

export default Sidebar;
