import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from 'reactstrap';

class AppHeader extends Component {

    state = {
        isOpen: false
    };
    toggle = this.toggle.bind(this);

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return  <Navbar  dark expand="md">
            <NavbarBrand href="/">
                <img src="https://acercapartners.com/wp-content/uploads/2019/05/logo-acerca.png" width="128" className="d-inline-block align-top" alt="" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />         
        </Navbar>;
    }
}

export default AppHeader;