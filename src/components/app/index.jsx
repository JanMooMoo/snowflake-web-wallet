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
import Wallet from '../../routes/wallet';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Container fluid className="app">
          <Row>
          <Col>
            <Wallet/>
            </Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
