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


  let allowed = 'sufficient-funds';

  if(fromWei(props.allowance) <= 0){
   
    allowed =  'insufficient-funds';
  }
  
  let funds = 'sufficient-funds';
  if(formatAmount(fromWei(props.normalBalance)) < parseInt(amountToStake) ){
    funds = 'insufficient-funds';
  }
  
  let minimum = 'sufficient-funds';
  if(amountToStake < parseInt(222222) ){
    minimum = 'insufficient-funds';
  }

  let approved = false;

  if(formatAmount(fromWei(props.allowance)) >= parseInt(222222)){
    approved = true;
    if(formatAmount(fromWei(props.allowance)) < parseInt(amountToStake) ){
      funds = 'insufficient-funds';
    }
  }

  


  return (
    <Card className="buy">
      <Row className="buy__header ">

      <p className="available-staking mb-0 col-sm-6 col-xs-5 col-lg-3" >
          <img src={hydro_blue_drop} className="hydro-staking-logo"/>
            {numeral(fromWei(props.normalBalance)).format('0,00.00')}
            </p>

        <Col xs="1" sm="2" lg="7" xl="8" className="text-right ml-5">

        <div className="tooltips"> <i class="fas fa-info-circle"  style={{cursor:"pointer"}}/>
        <span className="tooltiptexts">Information
        <p className="mt-2">1. First time stakers will need to request a 1-time approval before staking.</p>
        <p className="mt-2">2. Staked hydro tokens will be locked & cannot be unstaked for 90 days</p>
        <p className="mt-2">3. Staked hydro token will get an annualized yield of 7-12%</p>
        <p className="mt-1">4. Staking rewards is claimable anytime & without lock-up period</p>
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
              {fromWei(props.allowance) > 0? <div class="FormGroup_help__36Rs-">Available for staking: <strong> {numeral(fromWei(props.normalBalance)).format('0,00.00')}</strong></div>:              
              <div class="FormGroup_help__36Rs-"><strong>Approved for staking: No</strong></div>}

              </header>

              <div class=""><div class="FormGroup_wrapper__2JKVL">

                <div class="FormGroup_field__1mGpF">
                <input id="value" name="value" autocomplete="off" type="number" step="0.000001" value={(amountToStake)} placeholder="0.000000" onChange={e => setAmountToStake(e.target.value)} />
                </div>
                {approved?<div class="FormGroup_unit__3Lev9" onClick={e => setAmountToStake(formatAmount(fromWei(props.normalBalance)))}>Max</div>:<div class="FormGroup_unit__3Lev9" onClick={e => setAmountToStake(formatAmount(fromWei(props.normalBalance)))}>Max</div>}
                </div>
              </div>

              </div>
            </div>
       <div className={allowed}><strong>Request approval to spend Hydro Token before staking</strong></div>
       <div className="m-1"/>
       <div className={minimum}><strong>Minimum amount of 222,222 Hydro to stake</strong></div>
       <div className="m-1"/>
       <div className={funds}><strong>Insufficient Hydro Balance</strong></div>
       

      <Row className="justify-content-center">
        <Col className="text-center">

        {approved? <TransactButton
            readyText='Stake'
            disabled={false}
            method={()=>props.contract.methods.stake(toWei(amountToStake))}         
          />:
          <TransactButton
            readyText='Approve'
            disabled={false}
            method={()=>props.hydroContract.methods.approve(props.staking_address,toWei('1100000000000000000000000000000'))}         
          />}

        </Col>
      </Row>
    </Card>
  );
}

export default Stake;
