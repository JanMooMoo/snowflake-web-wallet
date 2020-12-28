/**
 * Displays the Wallet page
 */

import React, { Component } from 'react';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Stake from './components/Stake';
import Unstake from './components/Unstake';
import Web3 from 'web3';
import Staking_ABI from './contract/staking';
import hydro from './contract/hydro';
import {
  getBalanceUsd,
} from '../../services/hydroPrice';


var numeral = require('numeral');

export default class Staking extends Component {


  async loadBlockchain(){
    this.setState({loading:true})
    let ethereum= window.ethereum;
    let web3=window.web3;

    if(typeof ethereum !=='undefined'){
     await ethereum.enable();
     web3 = new Web3(ethereum);       
    }

    else if (typeof web3 !== 'undefined'){
    console.log('Web3 Detected!')
    window.web3 = new Web3(web3.currentProvider);
    }
 
    else{console.log('No Web3 Detected')
    window.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));  
    } 
   
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    const blockNumber = await web3.eth.getBlockNumber();
    if (this._isMounted){
    this.setState({blockNumber:blockNumber});
    }
    if (this._isMounted){
    this.setState({account: accounts[0]}); 
    }

    const Staking_Address = '0x83885CcB5a1bffF7a4C2A88dD8b2254b261c76BD';
    if (this._isMounted){ 
      this.setState({Staking_Address:Staking_Address})
    }
    const stakingContract= new web3.eth.Contract(Staking_ABI,Staking_Address);
    if (this._isMounted){
        this.setState({stakingContract:stakingContract});
    }

    const hydroContract = new web3.eth.Contract(hydro.abi,hydro.address);
    if (this._isMounted){
        this.setState({hydroContract:hydroContract});
    }

    const normalBalance = await this.state.hydroContract.methods.balanceOf(this.state.account).call()
    if (this._isMounted){
       this.setState({normalBalance:normalBalance},()=>console.log())
    }

    const allowance = await this.state.hydroContract.methods.allowance(this.state.account,Staking_Address).call()
    if (this._isMounted){
       this.setState({allowance:allowance},()=>console.log())
    }

    const duration = await this.state.stakingContract.methods.DURATION().call()
    if (this._isMounted){
       this.setState({duration:duration},()=>console.log())
    }

    const stakingBalance = await this.state.stakingContract.methods.balanceOf(this.state.account).call()
    if (this._isMounted){
      this.setState({stakingBalance:web3.utils.fromWei(stakingBalance)},()=>console.log())
   }

   const deadline = await this.state.stakingContract.methods.canWithdrawAt(this.state.account).call()
    if (this._isMounted){
      this.setState({deadline:new Date(parseInt(deadline,10)*1000)},()=>console.log())
   }

   const totalStaking= await this.state.stakingContract.methods.totalSupply().call()
   if (this._isMounted){
     this.setState({totalStaking:web3.utils.fromWei(totalStaking)},()=>console.log())
  }

    this.state.hydroContract.events.allEvents({filter:{_owner:this.state.account,_from:this.state.account,_to:this.state.account},fromBlock:blockNumber, toBlock:'latest'})
    .on('data',(log)=>{ this.loadBlockchain()})

    
    this.setState({loading:false})
    }

   
   async getUsdPrice() {
          const req = await getBalanceUsd(1);
          this.setState({price:req},()=>console.log())   
      }
  

	constructor(props) {
  super(props)
  this.state = {
        staking_ABI:[],
        stakingContract:[],
        hydroContract:[],
        account:[],
        loading:true,
        price:0,
        Staking_Address:'',

        duration:'',
        stakingBalance:'',
        normalBalance:'',
        allowance:'',
        totalStaking:'',
        deadline:0,
        

        address:null,
        blockNumber:'',
  
    }
}

render(){


  return (
    <Container>

      <Row className="wallet__row fadeit">

        <Col sm="12" md="12" lg="4" xl="4" className="mt-2">
        <section class="Card_main_cap"><h2>Hydro Price</h2><strong><p>$ {this.state.price}</p></strong></section>
        </Col>

        <Col sm="12" md="12" lg="4" xl="4" className="mt-2">
        <section class="Card_main_cap"><h2>Total Supply</h2><strong><p>11.1b</p></strong></section>
        </Col>
        
        <Col sm="12" md="12" lg="4" xl="4" className="mt-2">
        <section class="Card_main_cap"><h2>Total Staked</h2><strong><p>{numeral(this.state.totalStaking).format('0,00.00')}</p></strong></section>
        </Col>

      </Row>
      
      <Row className="wallet__row fadeit">
        <Col sm="12" md="12" lg="12" xl="12">
        <Stake duration={this.state.duration} 
        account={this.state.account} 
        normalBalance={this.state.normalBalance} 
        allowance={this.state.allowance}
        contract={this.state.stakingContract}
        hydroContract={this.state.hydroContract}
        staking_address={this.state.Staking_Address} />
        </Col>
        <Col>
        
        </Col>
        

      </Row>
      
      <Row className="identity__row fadeit mt-5">
      <Col sm="12" md="12" lg="12" xl="12">
      <Unstake duration={this.state.duration} 
      account={this.state.account} 
      contract={this.state.stakingContract} 
      stakingBalance={this.state.stakingBalance}
      deadline={this.state.deadline}/>  

        </Col>
      </Row>
      <Row>
        <Col className="nopadding">
          
        </Col>
      </Row>
    </Container>
  );
}
componentDidMount(){
  this._isMounted = true;
  this.loadBlockchain();
  this.getUsdPrice();
}
}



