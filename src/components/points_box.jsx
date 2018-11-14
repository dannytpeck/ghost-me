import React, { Component } from 'react';

class PointsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: '',
      editing: false,
      hasBeenEdited: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.revertChanges = this.revertChanges.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  ComponentDidMount() {
    this.setState({ text: this.props.points });
  }

  toggleEdit(e) {
    this.setState({
      editing: !this.state.editing
    });
  }

  revertChanges() {
    this.setState({
      hasBeenEdited: false,
      points: this.props.points
    });
  }

  saveChanges(event) {
    this.setState({
      hasBeenEdited: true,
      points: event.target.value
    });
  }

  handleKeyDown(event) {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    switch (event.which) {
      case ESCAPE_KEY:
        this.revertChanges();
        this.toggleEdit();
        break;
      case ENTER_KEY:
        this.saveChanges(event);
        this.toggleEdit();
        break;
    }
  }

  renderPointsInput() {
    return (
      this.state.hasBeenEdited ?
      <input type="text" className="form-control info-points" value={this.state.points} onChange={this.saveChanges} onKeyDown={this.handleKeyDown} onBlur={this.toggleEdit} autoFocus={true} /> :
      <input type="text" className="form-control info-points" value={this.props.points} onChange={this.saveChanges} onKeyDown={this.handleKeyDown} onBlur={this.toggleEdit} autoFocus={true} />
    );
  }

  renderPoints() {
    return (
      this.state.hasBeenEdited ?
      <span className="info-points" onDoubleClick={this.toggleEdit}>{this.state.points} pts</span> :
      <span className="info-points" onDoubleClick={this.toggleEdit}>{this.props.points} pts</span>
    );
  }

  render() {
    return (
      <div id="points-box" className="info-reward">
        {
          this.state.editing ?
          this.renderPointsInput() :
          this.renderPoints()
        }
      </div>
    );
  }
}

export default PointsBox;
