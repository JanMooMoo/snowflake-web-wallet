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
import Sidebar from '../sidebar';

function App() {
  return (
    <Router>
  <div>
    <Header />
    <Container fluid className="app">
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="12" className="app__content">
      
        <Sidebar />
          <hr/>
          <Switch>
            <Route exact path="/wallet" component={Wallet} />
            <Route exact path="/staking" component={Staking} />
          </Switch>
        </Col>
      </Row>
    </Container>
  </div>
</Router>
  );
}

export default App;
