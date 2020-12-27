/**
 * Displays the Buy Hydro component
 */


import React, {
    useState,
    useContext,
    useEffect,
  } from 'react';

  import {Link} from 'react-router-dom';
  import ClaimButton from './buttons/ClaimButton';
  
  import {
    Row,
    Col,
    Card,
  } from 'reactstrap';
  import {
    useWeb3Context,
  } from 'web3-react';
  
  import SnowflakeContext from '../../../contexts/snowflakeContext';
  
  import './index.scss'
  import {
    getBalanceUsd,
  } from '../../../services/hydroPrice';
  
  import {
    fromWei,
    formatAmount,
  } from '../../../services/format';

  import hydro_blue_drop from '../../staking/components/hydro_blue_drop.png' 

  

  
  var numeral = require('numeral'); 
  
  function AccountDetails(props) {
  
    const [usdBalance, setUsdBalance] = useState('0');
    const [usdBalanceEth, setUsdBalanceEth] = useState('0');
    const [usdBalanceStake, setUsdBalanceStake] = useState('0');
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
          setUsdBalance(numeral(req.toString()).format('0,00.00'));
        }

        /*if (props.normalBalance) {
          const usd = await getBalanceUsd(props.normalBalance);
          setUsdBalanceEth(usd.toString().substring(0, 5));
        }*/

        if (props.stakingBalance) {
          const stake = await getBalanceUsd(props.stakingBalance);
          setUsdBalanceStake(stake.toString().substring(0, 5));
        }
        
      }
  
      getUsdPrice();
    }, [snowflakeBalance]);
   
   let disabled = true;
   
   if(props.reward > 0.01){
    disabled = false;
   }


    return (
      <Card className="buy">
        <Row className="buy__header ">
          
         
            <div class="LoadingTitle_wrapper__3my0A">
              <h1 class="CardHeader_title__34DEx">
                <div class="Tooltip_flex__1ksLY">Overview</div>
                  </h1>
                  </div>
                  <div class="CardHeader_description__1QAfs">
                    <div class="Dl_dl__QuJxT Dl_horizontal__1jYvp ml-5 mr-5 mt-3">
                      <div class="Dl_dt__3zoU3 mr-3">Total Hydro</div>
                      <div class="Dl_dd__3OEmm mr-5">{numeral(parseInt(props.normalBalance) + parseInt(fromWei(snowflakeBalance.toString())) + parseInt(props.stakingBalance)).format('0,00.00') }  <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/></div>

                      <div class="Dl_dt__3zoU3 mr-3">Reward: </div>
                      <div class="Dl_dd__3OEmm mr-5">{numeral(props.reward.toString()).format('0,00.00')} <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/></div>

                      <div class="Dl_dt__3zoU3 mr-3">Total Value in USD</div>
                      <div class="Dl_dd__3OEmm mr-5">${numeral(((props.price * props.normalBalance) + parseInt(usdBalance) + (props.price * props.stakingBalance) + (props.price * props.reward)).toString()).format('0,00.00')}</div>
                     

                     
                     
                      </div>
                      </div>
        </Row>

        <Row className="buy__header ">
          
                <div className="table-wrapper">
                <table className="table-size">
                 <thead>
                 <tr>
                 <th>My Wallet</th>
                 <th>Balance</th>
                 <th>USD Value</th>
                 <th>Transact</th>
                </tr>
              </thead>
              
              <tbody>
                 <tr>
                 <th>Ethereum Wallet</th>
                 <th> <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/>{numeral(props.normalBalance.toString()).format('0,00.00')}</th>
                 <th>${numeral((props.price * props.normalBalance).toString()).format('0,00.00')}</th>
                 <th><Link to="/wallet"><button className="table_button">Withdraw</button></Link></th>
                 </tr>
                
                <tr>
                 <th>Snowflake Wallet</th>
                 <th> <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/>{numeral(fromWei(snowflakeBalance.toString())).format('0,00.00')}</th>
                 <th>${usdBalance}</th>
                 <th><Link to="/wallet"><button className="table_button">Deposit</button></Link></th>
                </tr>

                 <tr>
                 <th>Staking</th>
                 <th> <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/>{numeral(props.stakingBalance.toString()).format('0,00.00')}</th>
                 <th>${numeral((props.price * props.stakingBalance).toString()).format('0,00.00')}</th>
                 <th>  <Link to="/staking"><button className="table_button">Stake</button></Link></th>
                 </tr>

                 
                 <tr>
                 <th>Reward</th>
                 <th> <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/>{numeral(props.reward.toString()).format('0,00.00')}</th>
                 
                 {(props.price * props.reward) < 0.001 ? <th>$ 0.00</th>:
                 <th>${numeral((props.price * props.reward).toString()).format('0,00.00')}</th>}
                 <th>  
                   <ClaimButton
                      readyText='Claim'
                      method={()=>props.contract.methods.getReward()}  
                      disabled={disabled}       
                      />
                      </th>
                
                 </tr>
              </tbody>
                 
              </table>  
             </div>
         
             </Row>
  
      </Card>
    );
  }
  
  export default AccountDetails;