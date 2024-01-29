// GameInputComponent.js
import React, { useState, useEffect } from "react";
import "./GameInputComponent.css";
import Papa from "papaparse"; // CSV parsing library

const GameInputComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [entries, setEntries] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [clues, setClues] = useState([]);
  const [guessCount, setGuessCount] = useState(0);

  useEffect(() => {
    // Read countries.csv and set a random country as the correct answer
    fetch(process.env.PUBLIC_URL + "/countries.csv")
      .then((response) => response.text())
      .then((data) => {
        const parsedData = Papa.parse(data, { header: true });
        const randomIndex = Math.floor(Math.random() * parsedData.data.length);
        setCorrectAnswer(parsedData.data[randomIndex + 2].Country);

        // Display the first clue when the correct answer is set
        const firstClueCategory = Object.keys(parsedData.data[randomIndex])[0];
        const firstClueFact = parsedData.data[randomIndex][firstClueCategory];
        const formattedFirstClueCategory = firstClueCategory
          .replace("_", " ")
          .toUpperCase();
        setClues([`Clue #1: ${formattedFirstClueCategory} - ${firstClueFact}`]);
      })
      .catch((error) => console.error("Error reading countries.csv:", error));
  }, []); // Run this effect only once when the component mounts

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddEntry = () => {
    const isCorrect =
      inputValue.trim()?.toLowerCase() === correctAnswer?.toLowerCase();
    const entry = { value: inputValue, isCorrect };

    if (!isCorrect && correctAnswer) {
      // Generate a clue if the answer is incorrect and correctAnswer is available
      const clueCategory = Object.keys(correctAnswer)[0];
      const clueFact = correctAnswer[clueCategory];
      const formattedClueCategory = clueCategory
        .replace("_", " ")
        .toUpperCase();
      setClues([
        ...clues,
        `Clue #${guessCount + 2}: ${formattedClueCategory} - ${clueFact}`,
      ]);
    }

    setGuessCount(guessCount + 1);
    setEntries([...entries, entry]);
    setInputValue("");

    // End the game if the correct answer is guessed or there are 10 guesses
    if (isCorrect || guessCount === 9) {
      alert(
        isCorrect
          ? "Congratulations! You guessed the correct country!"
          : "Game Over. You reached the maximum number of guesses."
      );
      // Reset the game
      setGuessCount(0);
      setEntries([]);
      setClues([]);
    }
  };

  return (
    <div className="gameInputComponent">
      <div className="cluesContainer">
        {clues.map((clue, index) => (
          <div key={index} className="clue">
            {clue}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Enter country"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleAddEntry}>Check Answer</button>

      {entries.length > 0 && (
        <div className="entriesContainer">
          <h3>Entries:</h3>
          <ul>
            {entries.map((entry, index) => (
              <li
                key={index}
                className={entry.isCorrect ? "correct" : "incorrect"}
              >
                {entry.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameInputComponent;
