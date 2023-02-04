import React from "react";
import { Animated } from "react-animated-css";
import "./Info.scss";

const Info = ({ user, setShowInfo }) => {
  return (
    <div className="container">
      <Animated animationIn="zoomIn" animationOut="zoomOut">
        <div className="card-body">
          <button
            className="btn btn-danger close"
            onClick={() => {
              setShowInfo(false);
            }}
          >
            X
          </button>
          <div>
            <h1 style={{ color: "white", marginTop: "10px" }}>{user.name}</h1>
          </div>
          {/* <div
            className="img"
            style={{
              backgroundImage: `url(${user.url2})`,
            }}
          /> */}
          <div className="img">
            <img
              className="testimonial-img"
              src={require("../../images/100_0661.JPG")}
              alt="lady-profile"
            />
          </div>

          <p className="card-text">{user.bio}</p>
        </div>
      </Animated>
    </div>
  );
};

export default Info;
