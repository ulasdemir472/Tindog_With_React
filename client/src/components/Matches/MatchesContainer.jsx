import React from "react";
import MatchesDisplay from "./MatchesDisplay";
import MatchesHeader from "./MatchesHeader";
import "./matches.scss";
import Navbar from "../Navbar/Navbar";

const MatchesContainer = ({ user }) => {
  return (
    <div>
      <Navbar />
      <div className="match-container">
        <div className="match-section">
          <MatchesHeader />
          <span className="matches">Matches</span>
          <MatchesDisplay />
        </div>
      </div>
    </div>
  );
};

export default MatchesContainer;
