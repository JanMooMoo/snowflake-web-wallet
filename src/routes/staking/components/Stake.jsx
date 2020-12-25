/**
 * Displays the Buy Hydro component
 */


import React, {
  useState,
  useContext,
  useEffect,
} from 'react';

import {
  Row,
  Col,
  Card,
} from 'reactstrap';
import {
  useWeb3Context,
} from 'web3-react';

import hydro_blue_drop from './hydro_blue_drop.png'
import SnowflakeContext from '../../../contexts/snowflakeContext';


import {
  getBalanceUsd,
} from '../../../services/hydroPrice';

import {
  toWei,
  fromWei,
  formatAmount,
} from '../../../services/format';


import TransactButton from './buttons/TransactButton';
import './index.scss'

var numeral = require('numeral');


function Stake(props) {

  const [usdBalance, setUsdBalance] = useState('0');
  const [amountToStake, setAmountToStake] = useState('');


  const web3 = useWeb3Context();
  const snowflakeContext = useContext(SnowflakeContext);

  const {
    ethAddress,
    hydroBalance,
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


  let funds = 'sufficient-funds'
  if(formatAmount(fromWei(props.normalBalance)) < parseInt(amountToStake) ){
    funds = 'insufficient-funds'
  }

  let minimum = 'sufficient-funds'
  if(amountToStake < parseInt(222222) ){
    minimum = 'insufficient-funds'
  }

  let approved = false;

  if(formatAmount(fromWei(props.allowance)) >= parseInt(222222)){
    approved = true;
    if(formatAmount(fromWei(props.allowance)) < parseInt(amountToStake) ){
      funds = 'insufficient-funds'
    }
  }

  return (
    <Card className="buy">
      <Row className="buy__header ">

      <p className="available-staking mb-0 col-sm-6 col-xs-5 col-lg-3" >
          <img src={hydro_blue_drop} className="hydro-staking-logo"/>
            {formatAmount(fromWei(props.normalBalance))}
            </p>

        <Col xs="1" sm="2" lg="7" xl="8" className="text-right ml-5">

        <div className="tooltips"> <i class="fas fa-info-circle"  style={{cursor:"pointer"}}/>
        <span className="tooltiptexts">Information
        <p className="mt-2">1. Lock-up hydro tokens to get an annualized yield of 7-12%</p>
        <p className="mt-1">2. Total supply for Staking : 100 Million Hydro Tokens</p>
        <p className="mt-1 mb-2">3. Token holders can also unstake partial or full tokens before maturity. With the loss of some benefits.</p>
        </span>
        </div>


        </Col>

        <p className="buy__test-tokens mb-0 col-sm-10 mt-1">
          Hydro Balance
        </p>


      </Row>


      <div class="FormGroup_group__1Nj2I FormGroup_component__1Xdv1 py-4">
        <div class="FormGroup_border__1leMw">
          <header class="FormGroup_header__3pzEu">
            <div class="FormGroup_label__3QiUB">
              <label for="value">Amount</label>
              </div>
              <div class="FormGroup_help__36Rs-">Approved: <strong>{numeral((fromWei(props.allowance))).format('0,00.00')}</strong></div>
              </header>

              <div class=""><div class="FormGroup_wrapper__2JKVL">

                <div class="FormGroup_field__1mGpF">
                <input id="value" name="value" autocomplete="off" type="number" step="0.000001" value={(amountToStake)} placeholder="0.000000" onChange={e => setAmountToStake(e.target.value)} />
                </div>
                {approved?<div class="FormGroup_unit__3Lev9" onClick={e => setAmountToStake(formatAmount(fromWei(props.allowance)))}>Max</div>:<div class="FormGroup_unit__3Lev9" onClick={e => setAmountToStake(formatAmount(fromWei(props.normalBalance)))}>Max</div>}
                </div>
              </div>

              </div>
            </div>

       <div className={minimum}><strong>Minimum amount of 222,222 Hydro to stake</strong></div>
       <div className="m-1"/>
       <div className={funds}><strong>Insufficient Hydro Balance</strong></div>

      <Row className="justify-content-center mt-1">
        <Col className="text-center">

        {approved? <TransactButton
            readyText='Stake'
            method={()=>props.contract.methods.stake(toWei(amountToStake))}
          />:
          <TransactButton
            readyText='Approve'
            method={()=>props.hydroContract.methods.approve(props.staking_address,toWei(amountToStake))}
          />}

        </Col>
      </Row>
    </Card>
  );
}

export default Stake;
