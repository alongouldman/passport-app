import * as React from 'react';
import {NavLink, RouteComponentProps} from 'react-router-dom';
import { Menu} from "./Menu";
import Icons from "./icons";
import './Home.css'


export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
          <div>
            <div className="front-page">
              <div className="container">
                <div className="row align-items-center justify-content-center text-center">
                  <div className="col">
                    <h1>
                      Welcome to Photo Uploader
                    </h1>
                    <p>
                      Please upload you picture below. We will get it ready for you in our store!
                    </p>
                    <NavLink className="nav-link" to={'/upload'}>
                      <button className={"btn btn-primary"}>Upload Photo</button>
                    </NavLink>
                  </div>
                </div>

              </div>
            </div>
            <Icons/>

          </div>

        );
    }
}
