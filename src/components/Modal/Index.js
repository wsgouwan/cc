import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    };
  }

  handlerClose() {
    this.setState({show:false})
  }

  render() {
    let { show } = this.state;
    return (
      <div>
        {show ? (
          <div className="modal-wrap">
            <div className="mask" onClick={()=>{this.handlerClose()}} />
            <div className="content">{this.props.children}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
