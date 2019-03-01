import * as React from 'react';
import {NavLink, RouteComponentProps} from 'react-router-dom';
import { Menu} from "./Menu";

interface IProps {
  icon: string;
  title: string;
  text: string;
}

export default class Icon extends React.Component<IProps, {}> {
  public render() {
    return (
      <div className="one-icon">
        <i className={this.props.icon}></i>
        <h3 className="title">{this.props.title}</h3>
        <p>{this.props.text}</p>
      </div>

    );
  }
}
