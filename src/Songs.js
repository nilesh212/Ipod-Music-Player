import React from "react";
import "./App.css";
import Zingtouch from "zingtouch";

class Songs extends React.Component {
  constructor() {
    super();
    this.state = {
      process: false,
    };
  }
  /**
   * This is a Songs Component.
   * In this section, all all-songs and artists screens are defined.
   * songs Screens name:
   * 1)All songs
   * 2)artists
   *
   * Functions used are:
   * 1) rotateEventMusic()
   * 2) componentDidMount()
   * 3) render()
   */

  /**
   * This rotateEventMusic() function is used when songs-screen is visible and ipad-base is rotating.
   * Basically, used for changing active-music element.
   */
  rotateEventMusic() {
    let buttonContainer = document.querySelector(".button-container");
    let zt = new ZingTouch.Region(buttonContainer);
    let start = 0;
    // console.log("THIS>PROPS: ", this.props.allSongsScreen);
    let self = this;
    zt.bind(buttonContainer, "rotate", function (e) {
      let songsScreen = document.querySelector(".songs-screen");
      if (
        songsScreen.style.display != "none" &&
        self.props.allSongsScreen == "none"
      ) {
        start++;
        // console.log("START: ", start);
        if (start == 20) {
          start = 0;
          let activeMusic = document.querySelector(".active-music");
          if (activeMusic.classList[0] == "all-songs") {
            let artists = document.querySelector(".artists");
            artists.classList.add("active-music");
            activeMusic.classList.remove("active-music");
          } else {
            let allSongs = document.querySelector(".all-songs");
            allSongs.classList.add("active-music");
            activeMusic.classList.remove("active-music");
          }
          // console.log("Rotate event in songs:    ");
        }
      }
    });
  }

  // musicTiming = () => {
  //   const process_length = document.querySelector(".process-song");
  //   console.log("PROCESS LENGTH: ", process_length.offsetWidth);
  // };

  componentDidMount() {
    this.rotateEventMusic();
    // console.log("Compnonent did mount from MUSIC");
  }

  render() {
    const { allSongsScreen, audio, isPlaying } = this.props;
    const processStart = this.state.process;
    const processWidth = this.props.processWidth;
    // console.log(isPlaying);
    const self = this;
    return (
      <div className="music-container">
        <div className="music-side-menu">
          <h3>iPod.js</h3>
          <div className="all-songs active-music">
            All Songs{" "}
            <span style={{ color: "lightgreen", cursor: "context-menu" }}>
              &gt;
            </span>
          </div>
          <div className="artists">
            Artists{" "}
            <span style={{ color: "lightgreen", cursor: "context-menu" }}>
              &gt;
            </span>
          </div>
        </div>
        <div className="music-display"></div>
        <div className="all-songs-screen">
          {/* <div className="dancing-bar"></div> */}
          <div className="song-info">
            <div className="song-pic"></div>
            <div className="song-name">Song : Call Me Maybe</div>
          </div>
          <div className="process-song">
            <div
              className="processing-bar"
              style={{ width: processWidth + "%" }}
            ></div>
            <div className="process-marker"></div>
          </div>
        </div>
        <div className="artists-screen">
          <span className="artists-title">All Artists</span>
          <div className="artist-name-1">
            <div className="artist-image"></div>
            <div className="artist-info">Carly Rae Jepsen</div>
          </div>
          <div className="artist-name-2">
            <div className="artist-image"></div>
            <div className="artist-info">Coldplay</div>
          </div>
          <div className="artist-name-3">
            <div className="artist-image"></div>
            <div className="artist-info">Imagine Dragons</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Songs;
