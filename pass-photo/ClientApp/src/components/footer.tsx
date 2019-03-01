import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {Menu} from "./Menu";

export class Footer extends React.Component<{}, {}> {
  public render() {
    return (
      <div >
        <div className="above-footer"></div>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col">
                <h5 className="text-uppercase font-weight-bold">About the company</h5>
                <p>We take your passport photos and make them beautiful</p>
              </div>
              <div className="col">
                <h5>Site Map</h5>
                <ul className="nav flex-column">
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
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
