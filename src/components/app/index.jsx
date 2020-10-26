import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import Header from '../header';
import Sidebar from '../sidebar';
import Wallet from '../../routes/wallet';
import Identity from '../../routes/identity';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Container fluid className="app">
          <Row>
            <Col xs="12" sm="12" md="4" lg="4" xl="3" className="nopadding">
              <Sidebar />
            </Col>
            <Col xs="12" sm="12" md="8" lg="8" xl="9" className="app__content">
              <Switch>

                <Route exact path="/wallet" component={Wallet} />
                <Route exact path="/identity" component={Identity} />

              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
