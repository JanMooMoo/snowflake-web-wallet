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
  import TransactionButton from '../../../components/transactionButton';
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
  import Deadline from './Deadline';

  var numeral = require('numeral');

  function Unstake(props) {

    const [usdBalance, setUsdBalance] = useState('0');
    const [amountToUnstake, setAmountToUnstake] = useState('');
    const web3 = useWeb3Context();
    const snowflakeContext = useContext(SnowflakeContext);
   // const stakeBalance = props.contract.methods.balanceOf(props.account).call();

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


    let funds = 'sufficient-funds pt-2'
    if(parseInt(props.stakingBalance) < parseInt(amountToUnstake) ){
      funds = 'insufficient-funds pt-2'
    }

    return (
      <Card className="buy">
        <Row className="buy__header ">

        <p className="available-staking mb-0 col-sm-6 col-xs-5 col-lg-3" >
            <img src={hydro_blue_drop} className="hydro-staking-logo"/>
              {numeral(props.stakingBalance).format('0,00')}
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
            Staked Hydro
          </p>

        </Row>


        <div class="FormGroup_group__1Nj2I FormGroup_component__1Xdv1 py-4">
          <div class="FormGroup_border__1leMw">
            <header class="FormGroup_header__3pzEu">
              <div class="FormGroup_label__3QiUB">
                <label for="value">Amount</label>
                </div>
                <div class="FormGroup_help__36Rs-">Balance: <strong>{numeral(props.stakingBalance).format('0,00')}</strong></div>
                </header>
                <div class=""><div class="FormGroup_wrapper__2JKVL">

                  <div class="FormGroup_field__1mGpF">
                  <input id="value" name="value" autocomplete="off" type="number" step="0.000001" value={amountToUnstake} placeholder="0.000000" onChange={e => setAmountToUnstake(e.target.value)} />
                  </div>
                  <div class="FormGroup_unit__3Lev9" onClick={e => setAmountToUnstake(props.stakingBalance)}>Max</div>
                  </div>
                </div>

                </div>
              </div>
           <Deadline deadline={props.deadline}/>
          <div className={funds}><strong>Insufficient Stake Balance</strong></div>
         

        <Row className="justify-content-center mt-2">
          <Col className="text-center">
          <TransactButton
            readyText='Unstake'
            disabled={false}
            method={()=>props.contract.methods.withdraw(toWei(amountToUnstake))}         
          />
          </Col>
        </Row>
      </Card>
    );
  }

  export default Unstake;
