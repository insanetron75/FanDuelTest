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
      count: 0,
      result: {
        selectedPlayerScore: 0,
        otherPlayerScore: 0,
        message: "You haven't guessed yet"
      },
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getPlayers().then((players) => {
      players = shuffle(players);
      this.setState({
        players: shuffle(players),
      });
      this.setState({
        loading: false
      })
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

    if (result.result) {
      currentState.count = currentState.count + 1;
      if (currentState.count === 10) {
        alert('you win!');
        currentState.count = 0;
        result.message = "You've won! Keep going"
      }
    }

    currentState.result = result;
    this.setState(currentState)

    this.componentDidMount();
  }

  compare(selectedPlayer, otherPlayer) {
   return {
      selectedPlayerScore: selectedPlayer.score.toFixed(2),
      otherPlayerScore: otherPlayer.score.toFixed(2),
      message: selectedPlayer.score > otherPlayer.score ? "Correct!" : "Wrong!",
      result: selectedPlayer.score > otherPlayer.score
    }
  }

  isLoading() {
    console.log(this.state.loading);
    return this.state.loading;
  }
  render() {
    const firstPlayer = this.createPlayer('Player 1', this.state.players[0]);
    const secondPlayer = this.createPlayer('Player 2',this.state.players[1]);
    return (
      <Container>
        <Row className="mt-1">
          <Col>
            <Card>
              <Card.Header>Result</Card.Header>
              <Card.Title>{ this.state.result.message }</Card.Title>
              <Card.Body>
                Selected Player Score: { this.state.result.selectedPlayerScore }<br></br>
                Other Player Score: { this.state.result.otherPlayerScore }
              </Card.Body>
            </Card>
          </Col>
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
              onClick={ this.isLoading ? this.handleClick : null }
            >
              Select Player
            </Button>
          </Col>
          <Col>
            <Button 
              className="mt-1"
              variant="success"
              onClick={ this.isLoading ? this.handleClick : null }
            >Select Player </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Players;
