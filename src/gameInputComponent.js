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

function GameInputComponent() {
  // initialize user guess counts and states
  const maxGuesses = 10;
  const [inputValue, setInputValue] = useState("");
  const [userGuesses, setGuesses] = useState([]);
  const [userGuessCount, setGuessCount] = useState(0);

  // initialize the correct country and its data
  const allCountryNames = Object.keys(CountryData);
  const [correctCountryName, setCorrectCountryName] = useState(
    GetRandomCountryName(allCountryNames)
  );
  const correctCountryData = CountryData[correctCountryName];
  console.log(correctCountryName);

  // initialize the first clue
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

    // end the game if correct or out of guesses
    if (isCorrect || userGuessCount >= maxGuesses) {
      if (isCorrect) {
        const playAgain = window.confirm(
          "Congratulations! You guessed the correct country! Play again?"
        );
        if (playAgain) {
          RestartGame();
        }
      } else {
        const playAgain = window.confirm(
          `Sorry, you didn't guess the correct country. The correct country was ${correctCountryName}. Play again?`
        );
        if (playAgain) {
          RestartGame();
        }
      }
      return;
    }

    // add a new clue and increment the guess count
    const newClueCategory = GetRandomClueCategory(correctCountryData, clues);
    const newClueFact = CleanForDisplay(correctCountryData[newClueCategory]);
    setClues([
      ...clues,
      {
        category: CleanForDisplay(newClueCategory),
        fact: CleanForDisplay(newClueFact),
      },
    ]);
    setGuessCount(userGuessCount + 1);
    setGuesses([...userGuesses, userGuess]);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const RestartGame = () => {
    setGuessCount(0);
    setGuesses([]);
    setClues([]);
    setCorrectCountryName(GetRandomCountryName(allCountryNames));
    setClues([
      {
        category: CleanForDisplay(GetRandomClueCategory(correctCountryData)),
        fact: CleanForDisplay(correctCountryData[GetRandomClueCategory(correctCountryData)]),
      },
    ]);
    setInputValue("");
  };

  return (
    <div className="gameInputComponent">
      <div className="cluesContainer">
        {clues.map((clue, i) => (
          <div key={i} className="clue">
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

        <input type="submit" value="make a guess"></input>
      </form>

      {userGuesses.length > 0 && (
        <div className="userGuessesContainer">
          <h3>Guesses:</h3>
          <ul>
            {userGuesses.map((entry, i) => (
              <li key={i} className={entry.isCorrect ? "correct" : "incorrect"}>
                {entry.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GameInputComponent;
