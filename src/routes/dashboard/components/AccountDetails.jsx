/**
 * Displays the Buy Hydro component
 */


import React, {
    useState,
    useContext,
    useEffect,
  } from 'react';

  import {Link} from 'react-router-dom';
  
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
          setUsdBalance(req.toString().substring(0, 5));
        }

        /*if (props.normalBalance) {
          const usd = await getBalanceUsd(props.normalBalance);
          setUsdBalanceEth(usd.toString().substring(0, 5));
        }

        if (props.stakingBalance) {
          const stake = await getBalanceUsd(props.stakingBalance);
          setUsdBalanceStake(stake.toString().substring(0, 5));
        }*/
        
      }
  
      getUsdPrice();
    }, [snowflakeBalance]);
   
    
  
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
                      <div class="Dl_dd__3OEmm mr-5">{parseInt(props.normalBalance) + parseInt(fromWei(snowflakeBalance.toString())) + parseInt(props.stakingBalance) }  <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/></div>
                    
                      <div class="Dl_dt__3zoU3 mr-3">Total Value in USD</div>
                      <div class="Dl_dd__3OEmm mr-5">${((props.price * props.normalBalance) + parseInt(usdBalance) + (props.price * props.stakingBalance)).toString().substring(0, 5)}</div>
                      </div></div>
        </Row>

        <Row className="buy__header ">
          
                <div className="table-wrapper">
                <table className="table-size">
                 <thead>
                 <tr>
                 <th>My Wallet</th>
                 <th>Amount</th>
                 <th>USD Value</th>
                 <th>Transact</th>
                </tr>
              </thead>
              
              <tbody>
                 <tr>
                 <th>Ethereum Wallet</th>
                 <th> <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/>{props.normalBalance.toString().substring(0, 5)}</th>
                 <th>${(props.price * props.normalBalance).toString().substring(0, 5)}</th>
                 <th><Link to="/wallet"><button className="table_button">Withdraw</button></Link></th>
                 </tr>
                
                <tr>
                 <th>Snowflake Wallet</th>
                 <th> <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/>{fromWei(snowflakeBalance.toString())}</th>
                 <th>${usdBalance}</th>
                 <th><Link to="/wallet"><button className="table_button">Deposit</button></Link></th>
                </tr>

                 <tr>
                 <th>Staking</th>
                 <th> <img src={hydro_blue_drop} className="hydro-staking-logo ml-1"/>{props.stakingBalance.toString().substring(0, 5)}</th>
                 <th>${(props.price * props.stakingBalance).toString().substring(0, 5)}</th>
                 <th>  <Link to="/staking"><button className="table_button">Stake</button></Link></th>
                 </tr>
              </tbody>
                 
              </table>  
             </div>
         
             </Row>
  
       
  
      </Card>
    );
  }
  
  export default AccountDetails;