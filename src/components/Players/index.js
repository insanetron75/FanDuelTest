import React, { Component } from "react";
import getPlayers from "../../api/getPlayers";
import shuffle from "../../functions/shuffle";
import {
  Container,
  Col,
  Row,
  Button
} from 'react-bootstrap';
import Player from "../Player";

class Players extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      players: [
        {first_name: 'Loading...'},
        {first_name: 'Loading...'}
      ],
      count: 0
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

  createPlayer(header, player) {
    return {
      header,
      name: `${player.first_name} ${player.last_name}`,
      score: player.fppg,
      injuryStatus: player.injury_status,
      injury: player.injury_details,
    }
  }

  handleClick(e) {
    console.log(this.state);
    const players = [
      this.createPlayer('', this.state.players[0]),
      this.createPlayer('', this.state.players[1]),
    ]
  
    const currentState = this.state;
    const result = (e.target.id === "player_1_btn") 
      ? this.compare(players[0], players[1])
      : this.compare(players[1], players[0]);

    if (result) {
      currentState.count = currentState.count + 1;
      this.setState(currentState)
    } else {
      alert('WRONG!');
    }

    this.componentDidMount();
  }

  compare(selectedPlayer, otherPlayer) {
    const result = selectedPlayer.score > otherPlayer.score;
    console.log(selectedPlayer.score)
    console.log(otherPlayer.score)
    console.log(result);
    return selectedPlayer.score > otherPlayer.score
  }

  render() {
    const firstPlayer = this.createPlayer('Player 1', this.state.players[0]);
    const secondPlayer = this.createPlayer('Player 2',this.state.players[1]);
    return (
      <Container>
        <Row>
          <Col>
            <Player player={ firstPlayer }></Player>
          </Col>
          <Col>
            <Player player={ secondPlayer }></Player>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button 
              id="player_1_btn"
              className="mt-1"
              variant="success"
              onClick={ this.handleClick }
            >
              Select Player
            </Button>
          </Col>
          <Col>
            <Button 
              className="mt-1"
              variant="success"
              onClick={ this.handleClick }
            >Select Player </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Players;
