import React from "react";
import "./App.css";
import Songs from "./Songs";

class Screen extends React.Component {
  constructor() {
    super();
  }
  /**
   * This is a Screen Component.
   * In this section, all screens are defined.
   * Screens name:
   * 1)Songs
   * 2)Game
   * 3)Credit
   * 4)Setting
   */
  render() {
    const allSongsScreen = this.props.allSongsScreen;
    const audio = this.props.audio;
    const isPlaying = this.props.isPlaying;
    const processWidth = this.props.processWidth;
    return (
      <div className="screen">
        <div className="side-menu">
          <h3>iPod.js</h3>
          <div className="songs active">
            Songs{" "}
            <span style={{ color: "lightgreen", cursor: "context-menu" }}>
              &gt;
            </span>
          </div>
          <div className="games">
            Games{" "}
            <span style={{ color: "lightgreen", cursor: "context-menu" }}>
              &gt;
            </span>
          </div>
          <div className="profile">
            Credit{" "}
            <span style={{ color: "lightgreen", cursor: "context-menu" }}>
              &gt;
            </span>
          </div>
          <div className="settings">
            Settings{" "}
            <span style={{ color: "lightgreen", cursor: "context-menu" }}>
              &gt;
            </span>
          </div>
        </div>
        <div className="display"></div>
        <div className="songs-screen">
          <Songs
            allSongsScreen={allSongsScreen}
            audio={audio}
            isPlaying={isPlaying}
            processWidth={processWidth}
          ></Songs>
        </div>
        <div className="games-screen">Games</div>
        <div className="profile-screen">
          <div className="credits">
            <div className="crediter-image"></div>
            <div className="crediter-info">
              <div className="credit-title">MultiPlayer</div>
              <div className="credit-title-1">IPod</div>
              <div className="crediter-name">Created By: Nilesh</div>
              <div className="crediter-name"> Mare</div>
            </div>
          </div>
          <div className="credit-thanks">Thank you for visiting!!😊</div>
        </div>
        <div className="settings-screen">Settings</div>
      </div>
    );
  }
}

export default Screen;
