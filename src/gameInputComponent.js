// GameInputComponent.js
import React, { useState } from "react";
import "./GameInputComponent.css";
import CountryData from "./countries.json";

const CleanForDisplay = (str) => {
  return str.replaceAll("_", " ").toUpperCase();
};

const CleanForComparison = (str) => {
  return str.replaceAll("_", " ").toLowerCase().trim();
};

const ClueAlreadyUsed = (clue, clues) => {
  return clues.some((existingClue) => existingClue.category === clue.category);
};

const GetRandomClueCategory = (correctCountryData, clues = []) => {
  const randomNumber = Math.floor(Math.random() * 99999999);
  // this does weird -1 and +1 stuff to avoid the first key in the object
  const randomClueKeyindex = (randomNumber % (Object.keys(correctCountryData).length - 1)) + 1;
  const randomClue = Object.keys(correctCountryData)[randomClueKeyindex];

  if (ClueAlreadyUsed(randomClue, clues)) {
    return GetRandomClueCategory(correctCountryData, clues);
  }
  return randomClue;
};

const GetRandomCountryName = (allCountryNames) => {
  const randomValidIndex = Math.floor((Math.random() * 99999999) % allCountryNames.length);
  return allCountryNames[randomValidIndex];
};

const GameInputComponent = () => {
  const maxGuesses = 10;
  const [inputValue, setInputValue] = useState("");
  const [userGuesses, setGuesses] = useState([]);
  const [userGuessCount, setGuessCount] = useState(0);

  const allCountryNames = Object.keys(CountryData);
  const [correctCountryName] = useState(GetRandomCountryName(allCountryNames));
  const correctCountryData = CountryData[correctCountryName];

  const firstClueCategory = GetRandomClueCategory(correctCountryData);
  const firstClueFact = correctCountryData[firstClueCategory];
  const [clues, setClues] = useState([
    {
      category: CleanForDisplay(firstClueCategory),
      fact: CleanForDisplay(firstClueFact),
    },
  ]);

  const handleAddEntry = (e) => {
    e.preventDefault();
    const isCorrect = CleanForComparison(inputValue) === CleanForComparison(correctCountryName);
    const userGuess = { value: inputValue, isCorrect };

    if (!isCorrect) {
      const newClueCategory = GetRandomClueCategory(correctCountryData, clues);
      const newClueFact = CleanForDisplay(correctCountryData[newClueCategory]);
      setClues([
        ...clues,
        {
          category: CleanForDisplay(newClueCategory),
          fact: CleanForDisplay(newClueFact),
        },
      ]);
    }

    setGuessCount(userGuessCount + 1);
    setGuesses([...userGuesses, userGuess]);
    setInputValue("");

    // End the game if the correct answer is userGuessed or there are 10 userGuesses
    if (isCorrect || userGuessCount === maxGuesses) {
      alert(
        isCorrect
          ? "Congratulations! You userGuessed the correct country!"
          : "Game Over. You reached the maximum number of userGuesses."
      );
      // Reset the game
      setGuessCount(0);
      setGuesses([]);
      setClues([]);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="gameInputComponent">
      <div className="cluesContainer">
        {clues.map((clue, index) => (
          <div key={index} className="clue">
            {clue.category}: {clue.fact}
          </div>
        ))}
      </div>

      <form onSubmit={handleAddEntry}>
        <input
          type="text"
          placeholder="Enter country"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>

      <input type="submit" value="make a userGuess"></input>

      {userGuesses.length > 0 && (
        <div className="userGuessesContainer">
          <h3>Guesses:</h3>
          <ul>
            {userGuesses.map((entry, index) => (
              <li key={index} className={entry.isCorrect ? "correct" : "incorrect"}>
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
