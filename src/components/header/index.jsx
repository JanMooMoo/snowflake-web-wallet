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
  NavLink,
  Button,
  Badge,
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
          <NavbarBrand tag={RouterNavLink} exact to="/wallet">
          <h2 className="header__title">
              <img src={headerLogo} alt="Powered by Hydro" className="header__logo" />

            </h2>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />

          <div>
            <NavItem>

            <div className="routes">

            <NavLink tag={RouterNavLink} exact to="/wallet">

            <h2 className="header__title ">
            <Badge className="sidebar__badge" color="secondary" pill>
                </Badge>
                Wallet
            </h2>
            </NavLink>

            <NavLink tag={RouterNavLink} exact to="/staking">

            <h2 className="header__title ">
            <Badge className="sidebar__badge" color="secondary" pill>
                </Badge>
                Staking
            </h2>
            </NavLink>

            <NavLink tag={RouterNavLink} exact to="/overview">

            <h2 className="header__title">
            <Badge className="sidebar__badge" color="secondary" pill>
                </Badge>
                Overview
            </h2>
            </NavLink>
            </div>

            </NavItem>
          </div>




          <Collapse isOpen={isOpen} navbar>

            <Nav className="ml-auto align-items-center" navbar>

              <NavItem>

              <div>
                <NavItem>

                <HeaderAccount/>

                <div className="routes3">

                <NavLink tag={RouterNavLink} exact to="/wallet">

                <h2 className="header__title ">
                <Badge className="sidebar__badge" color="secondary" pill>
                    </Badge>
                    Wallet
                </h2>
                </NavLink>

                <NavLink tag={RouterNavLink} exact to="/staking">

                <h2 className="header__title ">
                <Badge className="sidebar__badge" color="secondary" pill>
                    </Badge>
                    Staking
                </h2>
                </NavLink>

                <NavLink tag={RouterNavLink} exact to="/overview">

                <h2 className="header__title">
                <Badge className="sidebar__badge" color="secondary" pill>
                    </Badge>
                    Overview
                </h2>
                </NavLink>
                </div>

                </NavItem>
              </div>


              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
