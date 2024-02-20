// GameInputComponent.js
import React, { useEffect, useState } from "react";
import "./GameInputComponent.css";
import { TCountries, TCountry, TClue } from "./types/Country";
import { TGuess } from "./types/Guess";
import CountryJsonData from "./countries.json";

const CountryData: TCountries = CountryJsonData;

function CleanForDisplay(str: string): string {
  return str.replaceAll("_", " ").toUpperCase();
}

function CleanForComparison(str: string): string {
  return str.replaceAll("_", " ").toLowerCase().trim();
}

// returns true if the clue category has already been used
function ClueAlreadyUsed(clueCategory: string, existingClues: TClue[]): boolean {
  return existingClues.some((existingClue) => existingClue.category === clueCategory);
}

// returns a random clue category that hasn't been used yet
function GetRandomClueCategory(countryData: TCountry, existingClues: TClue[]): string {
  const randNumber = Math.floor(Math.random() * 999999);
  const allClueCategories = Object.keys(countryData).filter(
    (clue) => clue !== "official_country_name"
  );
  const randClueCategory = allClueCategories[randNumber % allClueCategories.length];
  if (ClueAlreadyUsed(randClueCategory, existingClues) || countryData[randClueCategory] === "NA") {
    return GetRandomClueCategory(countryData, existingClues);
  }
  return randClueCategory;
}

// returns a random country name
function GetRandomCountryName(allCountryNames: string[]): string {
  const randValidIndex = Math.floor((Math.random() * 99999999) % allCountryNames.length);
  return allCountryNames[randValidIndex];
}

// returns a random country
function GetRandomCountry(): TCountry {
  const allCountryNames = Object.keys(CountryData);
  const randCountryName = GetRandomCountryName(allCountryNames);
  return CountryData[randCountryName];
}

//returns a random clue that hasn't been used yet
function GetRandomClue(correctCountryData: TCountry, existingClues: TClue[]): TClue {
  const randClueCategory = GetRandomClueCategory(correctCountryData, existingClues);
  const randClueFact = correctCountryData[randClueCategory];
  return {
    category: randClueCategory,
    fact: randClueFact,
  };
}

// returns an array of random clues to start with
function GetInitialClues(correctCountryData: TCountry): TClue[] {
  const newClues: TClue[] = [];
  const numclues = 3;
  for (let i = 0; i < numclues; i++) {
    newClues.push(GetRandomClue(correctCountryData, newClues));
  }
  return newClues;
}

function GameInputComponent() {
  // declarations
  const maxGuesses = 10;
  const [correctCountryData, setCorrectCountryData] = useState<TCountry>(CountryData.Afghanistan);
  const [clues, setClues] = useState<TClue[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userGuesses, setGuesses] = useState<TGuess[]>([]);

  // initialize country and clues on mount
  useEffect(() => {
    const initialCountry = GetRandomCountry();
    setCorrectCountryData(initialCountry);
    setClues(GetInitialClues(correctCountryData));
    console.log(initialCountry.official_country_name);
    // eslint-disable-next-line
  }, []);

  function submitGuessHandler(e: any) {
    e.preventDefault();

    const isCorrect =
      CleanForComparison(inputValue) ===
      CleanForComparison(correctCountryData.official_country_name);
    const userGuess = { value: inputValue, isCorrect };

    // end the game if correct
    if (isCorrect) {
      const playAgain = window.confirm(
        "Congratulations! You guessed the correct country! Play again?"
      );
      if (playAgain) {
        RestartGame();
      }
      return;
    }
    // end the game if max guesses reached
    if (userGuesses.length >= maxGuesses) {
      const playAgain = window.confirm(
        `Sorry, you didn't guess the correct country. The correct country was ${correctCountryData.official_country_name}. Play again?`
      );
      if (playAgain) {
        RestartGame();
      }
      return;
    }

    // if play continues, add a new clue and increment the guess count
    setClues([...clues, GetRandomClue(correctCountryData, clues)]);
    setGuesses([...userGuesses, userGuess]);
    setInputValue("");
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function RestartGame() {
    const initialCountry = GetRandomCountry();
    setGuesses([]);
    setClues([]);
    setCorrectCountryData(initialCountry);
    setClues(GetInitialClues(correctCountryData));
    setInputValue("");
    console.log(initialCountry.official_country_name);
  }

  return (
    <div className="game-input-component" data-testid="game-input-component">
      <div className="clues-container">
        {clues.map((clue, i) => (
          <div key={i} className="clue">
            <div className="clue-category">{CleanForDisplay(clue.category)}</div>
            <div className="clue-fact">{CleanForDisplay(clue.fact)}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submitGuessHandler} className="game-input-form">
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
