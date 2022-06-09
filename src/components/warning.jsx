import React from 'react';

const Warning = () => {
  return (
    <div id="warning" className="text-danger">
      <p>
        <em>WARNING: Double-check the Event ID, because this app will overwrite whatever is currently stored if you use an ID that's already in-use.</em>
      </p>
    </div>
  );
}

export default Warning;
