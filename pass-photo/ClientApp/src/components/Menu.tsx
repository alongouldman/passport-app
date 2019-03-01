import * as React from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import './menu.css';



export class Menu extends React.Component<{}, {}> {
  public render() {
    return (
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink className="navbar-brand" exact to={'/'}>Photo Uploader</NavLink>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact to={'/'}>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'#'}>About</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'/upload'}>Upload Photo</NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>


    );
  }
}
