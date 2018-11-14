import React, { Component } from 'react';
import ImageBox from './image_box';
import TitleBox from './title_box';
import TrumbowygBox from './trumbowyg_box';

class TilePreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="tile-preview">
        <div className="stretchy-wrapper">
          <ImageBox imageSrc={this.props.imageSrc} setImage={this.props.setImage} />
        </div>
        <div id="more-info-container">

          <TitleBox text={this.props.title} points={this.props.points} setTitle={this.props.setTitle} />
          <TrumbowygBox text={this.props.description} />

          <div className="item-info-actions">
            <button className="button button-primary">Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TilePreview;
