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
import Sidebar from '../sidebar';

function App() {
  return (
    <Router>
  <div>
    <Header />
    <Container fluid className="app">
      <Row>
        <Col xs="12" sm="12" md="12" lg="12" xl="12" className="app__content">
        <Col className="new-sidebar">
        <Sidebar />
        </Col>
          <Switch>
            <Route exact path="/wallet" component={Wallet} />
          </Switch>
        </Col>
      </Row>
    </Container>
  </div>
</Router>
  );
}

export default App;
