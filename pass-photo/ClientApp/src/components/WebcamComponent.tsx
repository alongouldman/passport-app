import * as React from "react";
import Webcam, {WebcamProps} from "react-webcam";
import './Webcam.css'


interface IProps {
  captureFunction: any;
  modalFunction: any;
}

interface IState {
    captured: boolean;
    isLoading: boolean;
    isValid: boolean;
    error: any;
}


export default class WebcamCapture extends React.Component <IProps, IState>{
    private webcam: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
        captured: false,
        isLoading: true,
        isValid: false,
        error: null,
    };
  }

  setRef = (webcam: any) => {
    this.webcam = webcam;
  };

    /**
     * remove text in the begginning of image and turn into Buffer object
     * @param imageWithName
     */
  removeImageName = (imageWithName: string) => {
    var cleanImage = imageWithName.replace(/^data:image\/(png|gif|jpeg);base64,/, '');
    return cleanImage;
  }

    /**
     * builds the url parameters of the GET request
     * @param dictionary
     */
  buildUrlParameters =(dictionary: any) => {
      var url = Object.keys(dictionary).map(function(key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(dictionary[key])
      }).join('&');
      return url;
  }

    /**
     * image validation
     * @param image
     */
  validate = (image: string) => {

      // microsoft face API
      var validateUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect/?';
      var params = {
          "returnFaceId": "false",
          "returnFaceLandmarks": "false",
          "returnFaceAttributes":
              "blur,exposure,noise"
      };
      validateUrl += this.buildUrlParameters(params);

      var secretKey = 'b97cd7e383f44a80bd831e0b41ae8f1d';

      // prepare the image
      var buffer = new Buffer(this.removeImageName(image),'base64');

      // request
      var request = new Request(validateUrl,
          {
              method: 'POST',
              headers: {
             'Content-Type': 'application/octet-stream',
              'Ocp-Apim-Subscription-Key': secretKey
              },
          body: buffer});
      // getting response
      fetch(request)
          .then(response => {
              this.setState({isLoading: false});
              return response.json()
          })
          .then( jsonResponse => {
              // TODO: add a massage for too many images
              if(jsonResponse.length == 0){ // didnt get the image
                  this.setState({error: "Couldn't get image, try again"})
              }
              else {
                  // validating the image
                  var blurLevel = jsonResponse[0].faceAttributes.blur.blurLevel;
                  var noise = jsonResponse[0].faceAttributes.noise.noiseLevel;
                  var exposure = jsonResponse[0].faceAttributes.exposure.exposureLevel;

                  if (blurLevel !== "low" && blurLevel !== 'medium') {
                      this.setState({error: "Image too blury, try again"});
                  }
                  else if (noise !== 'low') {
                      this.setState({error: "Image too noisy, try again"});
                  }
                  else if (exposure !== 'goodExposure') {
                      this.setState({error: "Wrong Exposure, try again"});
                  }
                  else { // image is good!
                      this.setState({isValid: true, error: null});
                      this.props.captureFunction(this.removeImageName(image)); // send picture to upload component
                      setTimeout(() => {
                          this.props.modalFunction(); // close the modal
                      }, 2000);
                  }
              }
              // reset the error massage
              setTimeout(() => {
                  this.setState({error: null});
              }, 3000);

          })
          .catch(function(error) {
              console.log(error);
              alert('An error occurred. Please try again later');
          });
  }

    /**
     * capture a picture from the webcan and validate it
     */
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({isLoading: true, captured: true, isValid: false, error: null });
    this.validate(imageSrc);
  };

    componentDidMount () {
        // load the button only after 2 seconds, to prevent from clicking before webcam is loaded
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 2000);
    }

    render() {

      var massage = '';
      if (this.state.isLoading && this.state.captured == true) {
          massage = 'Validating image...';
      }
      else if(this.state.isValid) {
          massage = 'Photo is Valid!';
      }
      else if (this.state.error !== null) {
          massage = this.state.error;
      }
      else {
          return (
              <div className="row align-items-center justify-content-center text-center webcam-and-button">
                      <div className="col-12" id="webcam-wrapper">
                      <Webcam
                      audio={false}
                      screenshotFormat="image/jpeg"
                      height={550}
                      className="webcam-video"
                      ref={this.setRef}
                      />
                      </div>
                      {!this.state.isLoading &&
                  <button className="btn btn-primary capture-button" type="button" onClick={this.capture}>
                      <i className="fas fa-camera"></i>
                      Capture photo
                  </button>
                  }
              </div>
          );
      }
      return (
          <div className="row align-items-center justify-content-center text-center message-box">
              <h1 className="col-12">
                  {massage}
              </h1>
              {this.state.isLoading &&
              <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
              }
          </div>
      );
  }
}

