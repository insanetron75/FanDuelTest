import React, { Component } from "react";
import getPlayers from "../../api/getPlayers";
import shuffle from "../../functions/shuffle";
import {
  Container,
  Card,
  Col,
  Row
} from 'react-bootstrap';
import Player from "../Player";

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

  createPlayer(header, player) {
    return {
      header,
      name: `${player.first_name} ${player.last_name}`,
      score: player.fppg,
      injuryStatus: player.injury_status,
      injury: player.injury_details,
    }
  }

  render() {
    const firstPlayer = this.createPlayer('Player 1', this.state.players[0]);
    const secondPlayer = this.createPlayer('Player 2',this.state.players[1]);
    return (
      <Container>
        <Row>
          <Col>
            <Player player={firstPlayer}></Player>
          </Col>
          <Col>
            <Player player={secondPlayer}></Player>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Players;
