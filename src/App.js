import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Screen from "./Screen";
import ZingTouch from "zingtouch";
import song from "./assets/call_me_maybe.mp3";

/**
 * This is a App Component. This is a root component;
 * Function Used in App Component:
 * 1) rotateEvent()
 * 2) switchDisplay()
 * 3) gotoHome()
 * 4) pausePlay()
 * 5) componentDidUpdate()
 * 6) componentDidMount()
 * 7) render()
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      songsScreen: "none",
      allSongsScreen: "none",
      audio: new Audio(song),
      isPlaying: false,
      processWidth: 0,
      songTime: 0,
    };
    this.endInterval = "";
  }

  /**
   * This is a rotateEvent() function. Here, I used zingtouch library
   *  for rotating the ipod-base
   */
  rotateEvent() {
    let buttonContainer = document.querySelector(".button-container");
    let zt = new ZingTouch.Region(buttonContainer);
    let start = 0;

    /**
     * zt.bind() is called every time rotate event occurs on ipod-base.
     */
    zt.bind(buttonContainer, "rotate", function (e) {
      let ipodDisplay = document.querySelector(".side-menu");
      let ipodDisplay1 = document.querySelector(".display");

      if (
        ipodDisplay.style.display != "none" &&
        ipodDisplay1.style.display != "none"
      ) {
        /**
         *  This code snippet is for changing active element after rotate event occurs.
         */
        start++;
        // console.log(start);
        if (e.detail.distanceFromLast > 0 && start >= 20) {
          /**
           * This snippet is executed when rotation is anticlockwise.
           */
          start = 0;
          let activeElement = document.querySelector(".active");
          // console.log(activeElement.classList[0]);
          if (activeElement.classList[0] == "songs") {
            let games = document.querySelector(".games");
            activeElement.classList.remove("active");
            games.classList.add("active");
            // console.log("games: ");
          } else if (activeElement.classList[0] == "games") {
            let profile = document.querySelector(".profile");
            activeElement.classList.remove("active");
            profile.classList.add("active");
            // console.log("profile: ");
          } else if (activeElement.classList[0] == "profile") {
            let settings = document.querySelector(".settings");
            activeElement.classList.remove("active");
            settings.classList.add("active");
            // console.log("settings: ");
          } else if (activeElement.classList[0] == "settings") {
            let songs = document.querySelector(".songs");
            activeElement.classList.remove("active");
            songs.classList.add("active");
            // console.log("Songs: ");
          }
        } else if (e.detail.distanceFromLast < 0 && start >= 20) {
          /**
           * This snippet is executed when rotation is clockwise.
           */
          start = 0;

          let activeElement = document.querySelector(".active");
          // console.log(activeElement.classList[0]);
          if (activeElement.classList[0] == "songs") {
            let settings = document.querySelector(".settings");
            activeElement.classList.remove("active");
            settings.classList.add("active");
            // console.log("settings: ");
          } else if (activeElement.classList[0] == "games") {
            let songs = document.querySelector(".songs");
            activeElement.classList.remove("active");
            songs.classList.add("active");
            // console.log("Songs: ");
          } else if (activeElement.classList[0] == "profile") {
            let games = document.querySelector(".games");
            activeElement.classList.remove("active");
            games.classList.add("active");
            // console.log("games: ");
          } else if (activeElement.classList[0] == "settings") {
            let profile = document.querySelector(".profile");
            activeElement.classList.remove("active");
            profile.classList.add("active");
            // console.log("profile: ");
          }
        }
        // console.log("e.detail.angle: ", e.detail.angle);
        // console.log("e.detail.distanceFromLast: ", e.detail.distanceFromLast);
        // console.log("e.detail.distanceFromOrigin: ", e.detail.distanceFromOrigin);
      }
    });
  }

  switchDisplay = () => {
    /**
     * This switchDisplay() function is for displaying screen of active element.
     */
    let ipodDisplay = document.querySelector(".side-menu");
    let ipodDisplay1 = document.querySelector(".display");
    ipodDisplay.style.display = "none";
    ipodDisplay1.style.display = "none";

    if (
      this.state.songsScreen == "none" &&
      this.state.allSongsScreen == "none"
    ) {
      /**
       * This code is executed for displaying screen of active-songs element.
       */
      let activeElement = document.querySelector(".active");
      if (activeElement.classList[0] == "songs") {
        let songsScreen = document.querySelector(".songs-screen");
        songsScreen.style.display = "block";

        this.setState((prevState) => {
          return { songsScreen: "block" };
        });

        // console.log(songsScreen);
      } else if (activeElement.classList[0] == "games") {
        let gamesScreen = document.querySelector(".games-screen");
        gamesScreen.style.display = "block";

        // console.log(gamesScreen);
      } else if (activeElement.classList[0] == "settings") {
        let settingsScreen = document.querySelector(".settings-screen");
        settingsScreen.style.display = "block";

        // console.log(settingsScreen);
      } else if (activeElement.classList[0] == "profile") {
        let profileScreen = document.querySelector(".profile-screen");
        profileScreen.style.display = "block";

        // console.log(profileScreen);
      }
    } else if (
      this.state.songsScreen == "block" &&
      this.state.allSongsScreen == "none"
    ) {
      /**
       * This code is executed for displaying screen of active element present on home screen.
       */
      let musicSideMenu = document.querySelector(".music-side-menu");
      let musicScreen = document.querySelector(".music-display");

      musicSideMenu.style.display = "none";
      musicScreen.style.display = "none";

      this.setState(() => {
        return { allSongsScreen: "block" };
      });

      let activeMusic = document.querySelector(".active-music");
      // console.log(activeMusic);
      if (activeMusic.classList[0] == "all-songs") {
        let allSongsScreen = document.querySelector(".all-songs-screen");

        /**
         * This code is executed to play song and displaying songs screen;
         */
        this.state.audio.play();
        const self = this;
        clearInterval(this.endInterval);
        this.endInterval = setInterval(() => {
          if (this.state.songTime === 197) {
            this.setState((prevState) => {
              return {
                processWidth: 0,
                songTime: 0,
              };
            });
            clearInterval(this.endInterval);
          } else {
            this.setState((prevState) => {
              return {
                processWidth: prevState.processWidth + 0.507,
                songTime: prevState.songTime + 1,
              };
            });
          }
        }, 1000);
        this.setState(() => {
          return { isPlaying: true };
        });

        const process_length = document.querySelector(".process-song");
        // console.log("PROCESS LENGTH: ", process_length.style.width);

        allSongsScreen.style.display = "block";
      } else {
        let artistsScreen = document.querySelector(".artists-screen");

        artistsScreen.style.display = "block";
      }
    }
  };

  gotoHome = () => {
    /**
     * This gotoHome() function is for showing only home screen and hiding all other screens.
     */
    let ipodDisplay = document.querySelector(".side-menu");
    let ipodDisplay1 = document.querySelector(".display");
    ipodDisplay.style.display = "block";
    ipodDisplay1.style.display = "block";

    this.setState(() => {
      return { allSongsScreen: "none", songsScreen: "none" };
    });

    let activeElement = document.querySelector(".active");
    if (activeElement.classList[0] == "songs") {
      let songsScreen = document.querySelector(".songs-screen");
      songsScreen.style.display = "none";

      this.setState(() => {
        return { allSongsScreen: "none" };
      });

      let musicSideMenu = document.querySelector(".music-side-menu");
      let musicScreen = document.querySelector(".music-display");

      musicSideMenu.style.display = "flex";
      musicScreen.style.display = "block";

      let activeMusic = document.querySelector(".active-music");
      if (activeMusic.classList[0] == "all-songs") {
        let allSongsScreen = document.querySelector(".all-songs-screen");

        allSongsScreen.style.display = "none";
      } else {
        let artistsScreen = document.querySelector(".artists-screen");

        artistsScreen.style.display = "none";
      }

      // console.log(songsScreen);
    } else if (activeElement.classList[0] == "games") {
      let gamesScreen = document.querySelector(".games-screen");
      gamesScreen.style.display = "none";
      // console.log(gamesScreen);
    } else if (activeElement.classList[0] == "settings") {
      let settingsScreen = document.querySelector(".settings-screen");
      settingsScreen.style.display = "none";
      // console.log(settingsScreen);
    } else if (activeElement.classList[0] == "profile") {
      let profileScreen = document.querySelector(".profile-screen");
      profileScreen.style.display = "none";
      // console.log(profileScreen);
    }
  };
  /**
   * This pausePlay() function is for playing and pausing song.
   */
  pausePlay = () => {
    if (this.state.isPlaying) {
      this.state.audio.pause();
      clearInterval(this.endInterval);
      this.setState((prevState) => {
        return { isPlaying: false };
      });
    } else {
      this.state.audio.play();
      const self = this;
      clearInterval(this.endInterval);
      this.endInterval = setInterval(() => {
        if (this.state.songTime === 197) {
          this.setState((prevState) => {
            return {
              processWidth: 0,
              songTime: 0,
            };
          });
          clearInterval(this.endInterval);
        } else {
          this.setState((prevState) => {
            return {
              processWidth: prevState.processWidth + 0.507,
              songTime: prevState.songTime + 1,
            };
          });
        }
      }, 1000);
      this.setState((prevState) => {
        return { isPlaying: true };
      });
    }
  };

  componentDidUpdate() {
    // console.log("Component did update");
  }

  /**
   * when componentDidMount() is executed audio is paused and rotateEvent() is called.
   */
  componentDidMount() {
    this.state.audio.pause();
    // console.log("Hi");
    this.rotateEvent();
  }

  render() {
    const allSongsScreen = this.state.allSongsScreen;
    const audio = this.state.audio;
    const isPlaying = this.state.isPlaying;
    const processWidth = this.state.processWidth;
    // console.log("render");
    return (
      <div className="App">
        <div className="ipod-display-container">
          <div className="ipod-display">
            <Screen
              allSongsScreen={allSongsScreen}
              audio={audio}
              isPlaying={isPlaying}
              processWidth={processWidth}
            ></Screen>
          </div>
        </div>
        <div className="ipod-base">
          <div className="button-container">
            <span className="prev-song"></span>
            <span className="next-song"></span>
            <span className="menu-song" onClick={this.gotoHome}></span>
            <span className="pause-song" onClick={this.pausePlay}></span>
            <span className="home-button" onClick={this.switchDisplay}></span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
