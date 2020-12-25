/**
 * Displays the Wallet page
 */

import React, {useContext} from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';


import Transactions from './components/transactions';
import DepositWithdraw from './components/depositWithdraw';
import BuyWithUniswap from './components/buyWithUniswap';
import Identity from '../../routes/identity';
import SnowflakeContext from '../../contexts/snowflakeContext';




function Wallet() {
  const snowflakeContext = useContext(SnowflakeContext);

  const {
    ein
  } = snowflakeContext;

  return (
    <Container>
      <Row className="identity__row fadeit">
      <Col sm="12" md="12" lg="12" xl="12">
        <Identity/>
        </Col>
      </Row>

      <Row className="wallet__row fadeit">
        <Col sm="12" md="12" lg="12" xl="6">
          <DepositWithdraw />
        </Col>
        <Col>
          <BuyWithUniswap />
        </Col>

      </Row>
      
      <Row>
        <Col className="nopadding">
          {ein && <Transactions />}
        </Col>
      </Row>
    </Container>
  );
}

export default Wallet;
