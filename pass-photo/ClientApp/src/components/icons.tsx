import * as React from 'react';
import Icon from "./icon";



export default class Icons extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="container">
        <div className="row align-items-center justify-content-center text-center title-section">
          <h1>Features</h1>
        </div>
        <div className="row align-items-center justify-content-center text-center icons-section">
          <div className="col-md-4">
            <Icon icon={"fas fa-check fa-10x"}  text="No more waiting in line; Upload a Photo from anywhere" title="Comfortable"/>
          </div>
          <div className="col-md-4">
            <Icon icon={"far fa-clock fa-10x"}  text="We will develope your photos in 1 hour TOP" title="Super Fast"/>
          </div>
          <div className="col-md-4">
            <Icon icon={"fas fa-hand-holding-usd fa-10x"}  text="Only 0.99 bucks for 5 passport photos" title="Affordable"/>
          </div>
        </div>
      </div>

    );
  }
}
