import React from "react";
import Players from "./components/Players";
import "./styles.css";
import getPlayers from "./api/getPlayers";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const players = getPlayers();
  return (
    <div className="App">
      <h1>FanDuel Test</h1>
      <Players players={players} />
    </div>
  );
}
