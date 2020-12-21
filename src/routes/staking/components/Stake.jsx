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
  fromWei,
  formatAmount,
} from '../../../services/format';

import {
  stakeDuration,
} from '../../../services/utilities';
import TransactButton from './buttons/TransactButton';
import './index.scss'




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
        <p className="mt-2">1. Lock-up hydro tokens for 7 days get an annualized yield of 7%</p>
        <p className="mt-1">2. Total supply for Stacking : 10 Million Hydro Tokens</p>
        <p className="mt-1 mb-2">3. Token holders can also unstake partial or full tokens before maturity. With the loss of some benefits.</p>
        </span>
        </div>
       
        
        </Col>
     
        <p className="buy__test-tokens mb-0 col-sm-10 mt-1">
          Available Hydro for staking
        </p>  
        
          
      </Row>

     
      <div class="FormGroup_group__1Nj2I FormGroup_component__1Xdv1 py-4">
        <div class="FormGroup_border__1leMw">
          <header class="FormGroup_header__3pzEu">
            <div class="FormGroup_label__3QiUB">
              <label for="value">Amount</label>
              </div>
              <div class="FormGroup_help__36Rs-">Balance: <strong>{formatAmount(fromWei(props.normalBalance))}</strong></div>
              </header>

              <div class=""><div class="FormGroup_wrapper__2JKVL">

                <div class="FormGroup_field__1mGpF">
                <input id="value" name="value" autocomplete="off" type="number" step="0.000001" value={amountToStake} placeholder="0.000000" onChange={e => setAmountToStake(e.target.value)} />
                </div>
                <div class="FormGroup_unit__3Lev9" onClick={e => setAmountToStake(formatAmount(fromWei(props.normalBalance)))}>Max</div>
                </div>
              </div>
              
              </div>
            </div>

       <section className={funds}><strong>Insufficient Hydro Balance</strong></section>

      <Row className="justify-content-center mt-3">
        <Col className="text-center">

        <TransactButton
            readyText='Stake'
            method={()=>props.contract.methods.stake(amountToStake)}         
          />
          
        </Col>
      </Row>
    </Card>
  );
}

export default Stake;