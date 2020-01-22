import React, { Component } from 'react';
import {
    Card,
} from 'react-bootstrap';

class Player extends Component {
    render() {
        const player = this.props.player;
        return (
            <Card bg="primary" text="white">
              <Card.Header>{this.props.player.header}</Card.Header>
              <Card.Body>
                <Card.Title>{player.name}</Card.Title>
                <Card.Text>
                  Injury Status: {player.injuryStatus}<br></br>
                  Injury: {player.injury}
                </Card.Text>
              </Card.Body>
            </Card>
        )
    }
};

export default Player;