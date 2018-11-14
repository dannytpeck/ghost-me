import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <img src="images/logo.png" />
        <h1 className="title">CIE Editor</h1>
      </header>
    );
  }
}

export default Header;
