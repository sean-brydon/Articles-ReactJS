import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,

  DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class Navibar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <Link to='/article/create' className='nav-link links'>
            Create Articles
          </Link>
        </NavItem>
        <UncontrolledDropdown nav inNavbar right='true'>
          <DropdownToggle>
            <strong>{user ? `Welcome ${user.username}` : ``}</strong>
          </DropdownToggle>
          <DropdownMenu>
            <Logout />
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm'>
          <NavbarBrand href='/' className='ml-3'>
            Easy Articles
          </NavbarBrand>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link to='/' className='nav-link links'>
                Home
              </Link>
            </NavItem>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Navibar);
