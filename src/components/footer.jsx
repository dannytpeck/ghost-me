import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <p><em>WARNING: Double-check the Event ID, because this app will overwrite whatever is currently stored if you use an ID that's already in-use.<br/>
        It's a great way to update already existing IDs but could be disastrous if you erase a custom CIE you didn't intend to overwrite!</em></p>
      </footer>
    );
  }
}

export default Footer;
