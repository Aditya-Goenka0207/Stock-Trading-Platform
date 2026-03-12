import React from "react";

function Universe() {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>The Zerodha Universe</h1>
        <p className="mt-3 text-muted">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="row mt-5">
          <div className="col-md-4 p-3">
            <img
              src="media/images/smallcaseLogo.png"
              alt="smallcase"
              style={{ width: "120px" }}
            />
            <p className="text-muted mt-2">Thematic investment platform</p>
          </div>

          <div className="col-md-4 p-3">
            <img
              src="media/images/streakLogo.png"
              alt="streak"
              style={{ width: "120px" }}
            />
            <p className="text-muted mt-2">Algo & strategy platform</p>
          </div>

          <div className="col-md-4 p-3">
            <img
              src="media/images/sensibullLogo.svg"
              alt="sensibull"
              style={{ width: "120px" }}
            />
            <p className="text-muted mt-2">Options trading platform</p>
          </div>

          <div className="col-md-4 p-3">
            <img
              src="media/images/zerodhaFundhouse.png"
              alt="fundhouse"
              style={{ width: "120px" }}
            />
            <p className="text-muted mt-2">Asset management</p>
          </div>

          <div className="col-md-4 p-3">
            <img
              src="media/images/goldenpiLogo.png"
              alt="goldenpi"
              style={{ width: "120px" }}
            />
            <p className="text-muted mt-2">Bonds trading platform</p>
          </div>

          <div className="col-md-4 p-3">
            <img
              src="media/images/dittoLogo.png"
              alt="ditto"
              style={{ width: "120px" }}
            />
            <p className="text-muted mt-2">Insurance</p>
          </div>
        </div>

        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;