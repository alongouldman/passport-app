import * as React from 'react';

export class ThankYouPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div>
        <div className="thank-you-page">
          <div className="container">
            <div className="row align-items-center justify-content-center text-center">
              <div className="col">
                <h1>
                  Thank You!
                </h1>
                <p>
                  The file has been processed successfully. In 1 hour you will have a ready passport photo printed in our store!
                </p>
                <a href="https://www.waze.com/ul?ll=32.15795222%2C34.80848765&navigate=yes&zoom=17" target="_blank">Click here for the WAZE link to the store</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
