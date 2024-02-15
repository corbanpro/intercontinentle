import "./App.css";
import GameInputComponent from "./gameInputComponent.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Intercontinentle</h1>
      </header>
      <div className="game-wrapper">
        <GameInputComponent />
      </div>
    </div>
  );
}

export default App;
