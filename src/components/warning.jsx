import React, { Component } from 'react';

class Warning extends Component {
  render() {
    return (
      <div id="warning" className="text-danger">
        <p><em>WARNING: Double-check the Event ID, because this app will overwrite whatever is currently stored if you use an ID that's already in-use.<br/>
        It's a great way to update already existing IDs but could be disastrous if you erase a custom CIE you didn't intend to overwrite!</em></p>
      </div>
    );
  }
}

export default Warning;
