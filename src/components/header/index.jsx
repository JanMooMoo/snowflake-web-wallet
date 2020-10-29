/**
 * TODO: Header - Make version dynamic and pull in settings file
 * FIXME: The event listeners may cause a memory leak
 * FIXME: Scrolling up / down is triggering an update
 */

import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import {
  NavLink as RouterNavLink,
} from 'react-router-dom';

import HeaderAccount from './components/headerAccount';
import headerLogo from '../../common/img/hydro-white-logo.png';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    const {
      isOpen,
    } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const {
      isOpen,
    } = this.state;

    return (
      <div>
        <Navbar color="light" light expand="md" className="bg-white">
          <NavbarBrand tag={RouterNavLink} exact to="/">
          <h2 className="header__title">
              <img src={headerLogo} alt="Powered by Hydro" className="header__logo" />

            </h2>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto align-items-center" navbar>
              <NavItem>
                <HeaderAccount />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
