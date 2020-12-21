/**
 * Displays the card with the Deposit and Withdraw components
 */

import React, {
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  Row,
  Col,
  Button,
  Card,
} from 'reactstrap';

import SnowflakeContext from '../../../../contexts/snowflakeContext';

import Deposit from '../deposit';
import Withdraw from '../withdraw';

import {
  getBalanceUsd,
} from '../../../../services/hydroPrice';

import {
  fromWei,
  formatAmount,
} from '../../../../services/format';

function DepositWithdraw() {
  const [tab, setTab] = useState('none');
  const [usdBalance, setUsdBalance] = useState('0');

  const snowflakeContext = useContext(SnowflakeContext);

  const {
    ethAddress,
    snowflakeBalance,
  } = snowflakeContext;

  useEffect(() => {
    async function getUsdPrice() {
      if (snowflakeBalance) {
        const req = await getBalanceUsd(fromWei(snowflakeBalance.toString()));
        setUsdBalance(req.toString().substring(0, 5));
      }
    }

    getUsdPrice();
  }, [snowflakeBalance]);

  function displayTab() {
    if (tab === 'deposit') {
      return (
        <Deposit
          cancel={() => setTab('none')}
          user={ethAddress}
        />
      );
    }

    if (tab === 'withdraw') {
      return (
        <Withdraw
          cancel={() => setTab('none')}
          user={ethAddress}
        />
      );
    }

    return (
      <div>
        <Row>
          <Col className="text-center">
            <p className="deposit-withdraw__balance mb-0">
              {formatAmount(fromWei(snowflakeBalance.toString()))}
              <span className="deposit-withdraw__hydro">
                Hydro
              </span>
            </p>
            <p className="deposit-withdraw__usd small">
              {`${usdBalance} USD`}
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center pt-5 pr-4">
          <Col className="text-right center" sm="12" xs="12" med="6" lg="6" xl="6">
            <Button className="deposit-withdraw__deposit-button mt-3" onClick={() => setTab('deposit')}>
              Deposit
            </Button>
          </Col>
          <Col className="text-left center" sm="12" xs="12" med="6" lg="6" xl="6">
            <Button color="success deposit-withdraw__withdraw-button mt-3" onClick={() => setTab('withdraw')}>
              Withdraw
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Card className="deposit-withdraw">
      <Row className="deposit-withdraw__header">
        <Col xs="10">
          <p className="deposit-withdraw__title mb-0">
            Hydro Wallet
          </p>
        </Col>
        <Col xs="2" sm="2" className="text-right">
        </Col>
      </Row>
      {displayTab()}
    </Card>
  );
}

export default DepositWithdraw;
