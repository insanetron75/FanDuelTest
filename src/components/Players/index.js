import React, { Component } from "react";
import getPlayers from "../../api/getPlayers";

class Players extends Component {
  constructor() {
    super();
    this.state = {
      players: {}
    };
  }

  componentDidMount() {
    getPlayers().then(players => {
      this.setState({
        players
      });
    });
    console.log(this.state.players);
  }

  render() {
    return <h1>test</h1>;
  }
}
export default Players;
