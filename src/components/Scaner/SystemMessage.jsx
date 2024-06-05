import React from "react";

export default class SystemMessage extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="handleScanContainer__inner">
        <div className="row justify-content-center">
          <div className="col-lg-auto">
            <h2 className='text-center'>{data.message}</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-auto">
            <p style={{ textAlign: "center" }}>{data.description}</p>
          </div>
        </div>

      </div>
    );
  }
}
