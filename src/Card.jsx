import React, { Component } from 'react';
import { Icon } from 'antd';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    console.log(this.props.data.hr);
    return (
      <div className="content-card">
        <div className="card-logo" style={{filter: `hue-rotate(${this.props.data.hr}deg)`}}></div>
        <div className="card-header">
          {this.props.data.header}
        </div>
        <div className="card-text">
          {this.props.data.desc}
        </div>
        <div className="card-more">
        <span style={{flexGrow: 1}}>Подробнее</span>
        <Icon type="arrow-right" />
        </div>
        <div className="card-price">{this.props.data.price}</div>
      </div>
    )
  }
}

export default Card;