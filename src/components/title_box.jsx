import React, { Component } from 'react';
import PointsBox from './points_box';

class TitleBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      editing: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  toggleEdit(e) {
    this.setState({
      editing: !this.state.editing
    });
  }

  updateTitle(event) {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    switch (event.which) {
      case ESCAPE_KEY:
        this.toggleEdit();
        break;
      case ENTER_KEY:
        this.toggleEdit();
        break;
      default:
        this.props.setTitle(event.target.value);
        break;
    }
  }

  render() {
    return (
      <div id="title-box" className="info-header">
        {
          this.state.editing ?
          <input type="text" className="form-control info-title" value={this.props.text} onKeyUp={this.updateTitle} onChange={this.updateTitle} onBlur={this.toggleEdit} autoFocus={true} /> :
          <h3 className="info-title" onDoubleClick={this.toggleEdit}>{this.props.text}</h3>
        }
        <PointsBox points={this.props.points} />
      </div>
    );
  }
}

export default TitleBox;
