// GameInputComponent.js
import React, { useEffect, useState } from "react";
import "./GameInputComponent.css";
import {
  TCountries,
  TCountry,
  TValidCountries,
  TClue,
  TValidClueCategories,
} from "./types/Country";
import { TGuess } from "./types/Guess";
import CountryJsonData from "./countries.json";

function CleanForDisplay(str: string): string {
  return str.replaceAll("_", " ").toUpperCase();
}

function CleanForComparison(str: string): string {
  return str.replaceAll("_", " ").toLowerCase().trim();
}

function ClueAlreadyUsed(clue: string, clues: TClue[]): boolean {
  const clueSeen = clues.some((existingClue) => existingClue.category === clue);
  const clueNa = clue === "NA";
  return clueSeen || clueNa;
}

function GetRandomClueCategory(
  correctCountryData: TCountry,
  clues: TClue[] = []
): TValidClueCategories {
  const randomNumber = Math.floor(Math.random() * 99999999);
  // this does weird -1 and +1 stuff to avoid the first key in the object
  const randomClueKeyindex = (randomNumber % (Object.keys(correctCountryData).length - 1)) + 1;
  const randomClueCategory = Object.keys(correctCountryData)[
    randomClueKeyindex
  ] as TValidClueCategories;

  if (ClueAlreadyUsed(randomClueCategory, clues)) {
    return GetRandomClueCategory(correctCountryData, clues);
  }
  return randomClueCategory;
}

function GetRandomCountryName(allCountryNames: TValidCountries[]): TValidCountries {
  const randomValidIndex = Math.floor((Math.random() * 99999999) % allCountryNames.length);
  return allCountryNames[randomValidIndex];
}

function GameInputComponent() {
  // initialize user guess counts and states
  const maxGuesses = 10;

  const [inputValue, setInputValue] = useState("");
  const [userGuesses, setGuesses] = useState<TGuess[]>([]);
  const [userGuessCount, setGuessCount] = useState(0);
  const [clues, setClues] = useState<TClue[]>([]);
  const CountryData: TCountries = CountryJsonData;
  const allCountryNames = Object.keys(CountryData) as TValidCountries[];
  const [correctCountryName, setCorrectCountryName] = useState<TValidCountries>(
    GetRandomCountryName(allCountryNames)
  );
  const correctCountryData: TCountry = CountryData[correctCountryName];

  // initialize the first clue on mount
  useEffect(() => {
    const firstClueCategory = GetRandomClueCategory(correctCountryData);
    const firstClueFact = correctCountryData[firstClueCategory];
    setClues([
      {
        category: CleanForDisplay(firstClueCategory),
        fact: CleanForDisplay(firstClueFact),
      },
    ]);

    // eslint-disable-next-line
  }, [userGuessCount]);

  const handleAddEntry = (e: any) => {
    e.preventDefault();

    const isCorrect = CleanForComparison(inputValue) === CleanForComparison(correctCountryName);
    const userGuess = { value: inputValue, isCorrect };

    // end the game if correct
    if (isCorrect) {
      const playAgain = window.confirm(
        "Congratulations! You guessed the correct country! Play again?"
      );
      if (playAgain) {
        RestartGame();
        return;
      }
    }
    // end the game if max guesses reached
    if (userGuessCount >= maxGuesses) {
      const playAgain = window.confirm(
        `Sorry, you didn't guess the correct country. The correct country was ${correctCountryName}. Play again?`
      );
      if (playAgain) {
        RestartGame();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="game-input-component">
      <div className="clues-container">
        {clues.map((clue, i) => (
          <div key={i} className="clue">
            <div className="clue-category">
              {clue.category}
            </div>
            <div className="clue-fact" >
              {clue.fact}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddEntry} className="game-input-form">
        <input
          type="text"
          placeholder="Enter country"
          className="country-input"
          value={inputValue}
          onChange={handleInputChange}
        />

        <input className="guess-submit" type="submit" value="make a guess"></input>
      </form>

      {userGuesses.length > 0 && (
        <div className="guess-container">
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
