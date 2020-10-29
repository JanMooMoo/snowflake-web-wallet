/**
 * Displays tools to manage the identity of the current user
 * TODO: Identity - Fix the col width and center the elements
 */

import React, {
  useContext,
} from 'react';
import {
  Row,
  Col,
  Card,
} from 'reactstrap';
import {
  IoMdLink,
} from 'react-icons/io';

import SnowflakeContext from '../../contexts/snowflakeContext';

import Identicon from '../../components/identicon';
import HelpButton from '../../components/helpButton';

import tooltips from '../../common/config/tooltips.json';

import LinkedAddress from './components/linkedAddress';
import LinkAddressCard from './components/linkAddressCard';

const Identity = () => {
  const user = useContext(SnowflakeContext);

  const {
    ein,
    hydroId,
    associatedAddresses,
  } = user;

  return (
    <div>

      <Row className="py-3 justify-content-center align-items-center fadeit">
        <Col sm="12" md="12" lg="12" xl="5">
          <Card className="identity">
            <Row className="p-3 justify-content-center align-items-center ">
              <Col xs="10">
                <p className="identity__title">
                  Your Snowflake (EIN)
                </p>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center pb-4">
              <Col xs="6">
                <p className="identity__user-image">
                  {ein !== null && (
                    <Identicon seed={ein} />
                  )}
                </p>
              </Col>
              <Col xs="6">
                <p className="identity__hydro-id">
                  Hydro ID:
                  {' '}
                  {hydroId}
                </p>
                <p className="identity__ein">
                  EIN:
                  {' '}
                  {ein}
                </p>
                <p className="identity__linked-wallets">
                  {`Linked Wallet(s): ${associatedAddresses.length}`}
                </p>
              </Col>
              <Col>
              {associatedAddresses.map(address => (
                <LinkedAddress
                  key={address}
                  address={address}
                  removable={associatedAddresses.length > 1}
                />
              ))}
              </Col>
            </Row>
          </Card>
        </Col>

        <Col sm="12" md="12" lg="12" xl="5">
          <LinkAddressCard />
        </Col>
      </Row>

    </div>
  );
};

export default Identity;
