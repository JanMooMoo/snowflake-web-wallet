import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import Header from '../header';
import Wallet from '../../routes/wallet';
import Staking from '../../routes/staking';
import Dashboard from '../../routes/dashboard';

function App() {
  return (
    <Router>
  <div>
    <Header />
    <Container fluid className="app">
      <Row>
          <hr/>
          <Switch>
            <Route exact path="/" component={Staking} />
            <Route exact path="/wallet" component={Wallet} />
            <Route exact path="/staking" component={Staking} />
            <Route exact path="/overview" component={Dashboard} />
          </Switch>
      </Row>
    </Container>
  </div>
</Router>
  );
}

export default App;
