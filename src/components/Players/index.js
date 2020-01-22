import React, { Component } from "react";
import getPlayers from "../../api/getPlayers";
import shuffle from "../../functions/shuffle";
import {
  Container,
  Col,
  Row,
  Button,
  Card
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

  compare = (selectedPlayer, otherPlayer) => (selectedPlayer.score > otherPlayer.score)

  render() {
    const firstPlayer = this.createPlayer('Player 1', this.state.players[0]);
    const secondPlayer = this.createPlayer('Player 2',this.state.players[1]);
    return (
      <Container>
        <Row className="mt-1">
          <Col></Col>
            <Col>
              <Card bg="success">
                <Card.Header>Score:</Card.Header>
                <Card.Title>{this.state.count}</Card.Title>
              </Card>
            </Col>
          <Col></Col>
        </Row>
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
