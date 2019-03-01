import * as React from 'react';
import WebcamCapture from "./WebcamComponent";
import Modal from "./Modal";
import './upload.css';
import {Redirect} from "react-router";

interface IProps {
}

interface IState {
  name: string;
  files: any;
  isValidName: boolean;
  isValidImage: boolean;
  subbmittedSuccessfully: boolean;
}

export class PhotoUploader extends React.Component<{}, IState> {

  constructor(props: IProps) {
    super(props);

    this.state={
      name: '',
      files: null,
      isValidName: false,
      isValidImage: false,
      subbmittedSuccessfully: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  /**
   * handles the submit of the form, and sends the picture to the server
   * @param e
   */
  private handleSubmit(e: any) {
    e.preventDefault();
    const costumerName = this.state.name;
    const photo = this.state.files;
    if (!photo || !costumerName){
      return;
    }
    console.log(this.state.files);
    const data = new FormData();
    data.append('costumerName', costumerName);
    data.append('file', photo);
    fetch('/UploadPhoto/upload', {
      method: 'POST',
      body: data,
    })
        .then(response => {
           console.log(response);
           if(response.ok) {
             this.setState({subbmittedSuccessfully: true});
           }
        });

    // reset state
    this.setState({
      name: '',
      files: null,
      isValidName: false,
      isValidImage: false
    });
  }

  /**
   * on every change of the value in the name input filed. validate the name
   * @param e
   */
  private onNameChange(e: any){
    var value = e.target.value;

    // regex validation
    var regex = /^[a-zA-Z ]{2,30}$/;
    if (regex.test(value)) { // valid name
      this.setState({isValidName: true});
    }
    else {
      this.setState({isValidName: false});
    }
    this.setState({name: value});
  }

  // this function recives a photo from the webcam
  public onScreanCapture = (image: string) => {
    this.setState({files: image, isValidImage: true}); // the test for image validation is in the capture function

  }

  public render() {
    return (
      <div className="upload-photo">
        {this.state.subbmittedSuccessfully && <Redirect to='/thankyou' />}
        <div className="container">
          <div className="row align-items-center justify-content-center text-center">
            <h1 className='col-12 title'>Upload Photo</h1>
            <div className="col">Fill in the form below, and come pick up your photo in 1 hour</div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Full Name</label>
                  <input type="text"
                         className={((this.state.isValidName || this.state.name == '') ? "" : "invalid " ) + "form-control"}
                         name="costumerName"
                         value={this.state.name}
                         onChange={this.onNameChange}
                         placeholder="Enter your name"
                  />
                  {!this.state.isValidName && this.state.name != '' && <small className="invalid-text">Invalid name</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="file">Take a picture of yourself</label>
                  <Modal changeFunction={this.onScreanCapture}/>
                </div>

                <button type="submit"
                        className= {((this.state.isValidImage && this.state.isValidName) ? "" : "disabled ") + "btn btn-success"}>
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    );
  }


}

