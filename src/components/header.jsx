import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <img src="images/logo.svg" />
        <h1 className="title">Ghost Me</h1>
        <h3>An App to create Ghost CIEs</h3>
      </header>
    );
  }
}

export default Header;
