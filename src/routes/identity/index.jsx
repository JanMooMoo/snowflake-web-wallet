/**
 * Displays tools to manage the identity of the current user
 * TODO: Identity - Fix the col width and center the elements
 */

import React, {
  useContext,useState
} from 'react';
import {
  Row,
  Col,
  Card,
  Button
} from 'reactstrap';
import SnowflakeContext from '../../contexts/snowflakeContext';
import Identicon from '../../components/identicon';
import Onboarding from '../../components/onboarding';
import LinkedAddress from './components/linkedAddress';
import LinkAddressCard from './components/linkAddressCard';



const Identity = () => {
  const user = useContext(SnowflakeContext);
  

  const {
    hasProvider,
    ein,
    networkId,
    hydroId,
    associatedAddresses,
  } = user;

const [isModalOpen, toggleModal] = useState(false);

  return (
    <div>

      <Row className="py-3 justify-content-center align-items-center fadeit">
        <Col sm="12" md="12" lg="12" xl="6">
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
              <Col className="linked-address-col">
              {associatedAddresses.map(address => (
                <LinkedAddress
                  key={address}
                  address={address}
                  removable={associatedAddresses.length > 1}
                />
              ))}
              </Col>
            </Row>

            <Onboarding
              hasProvider={hasProvider}
              networkId={networkId}
              isOpen={isModalOpen}
              toggle={() => toggleModal(!isModalOpen)}
            />

            {ein === null && <Row className="py-3 justify-content-center align-items-center fadeit">
            <div className="onboardingButton">
              <Button color="primary" onClick={() => toggleModal(!isModalOpen)}>
              Create Account
              </Button>
            </div>
            </Row>}

          </Card>
        </Col>

        <Col sm="12" md="12" lg="12" xl="6">
          <LinkAddressCard />
        </Col>
      </Row>
      

    </div>
  );
};

export default Identity;
