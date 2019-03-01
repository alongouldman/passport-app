import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Menu} from "./components/Menu";
import {BrowserRouter, HashRouter, Route, Router} from "react-router-dom";
import {ThankYouPage} from "./components/ThankYouPage";
import Home from "./components/Home";
import {PhotoUploader} from "./components/upload";
import {Footer} from "./components/footer";

class App extends Component {
  render() {
      return (
          <BrowserRouter>
              <div>
                  <Menu/>
                  <Route exact path='/' component={Home}/>
                  <Route path='/upload' component={PhotoUploader}/>
                  <Route path='/thankyou' component={ThankYouPage}/>
                  <Footer />
              </div>

          </BrowserRouter>

      );
  }
}

export default App;
