import React, { Component } from "react";
import getPlayers from "../../api/getPlayers";
import shuffle from "../../functions/shuffle";

class Players extends Component {
  constructor() {
    super();
    this.state = {
      players: [
        {first_name: 'Loading...'},
        {first_name: 'Loading...'}
      ]
    };
  }

  componentDidMount() {
    getPlayers().then((players) => {
      players = shuffle(players);
      this.setState({
        players: shuffle(players)
      });
    });
  }

  render() {
    const firstPlayer = `${this.state.players[0].first_name} ${this.state.players[0].last_name}`;
    const secondPlayer = `${this.state.players[1].first_name} ${this.state.players[1].last_name}`;
    return (
      <div class="players">
        <h1>{firstPlayer}</h1>
        <h1>{secondPlayer}</h1>
      </div>
    );
  }
}

export default Players;
