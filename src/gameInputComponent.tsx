// GameInputComponent.js
import React, { useEffect, useState } from "react";
import "./GameInputComponent.css";
import { TCountries, TCountry, TValidCountry, TClue, TValidClueCategories } from "./types/Country";
import { TGuess } from "./types/Guess";
import CountryJsonData from "./countries.json";

const CountryData: TCountries = CountryJsonData;

function CleanForDisplay(str: string): string {
  return str.replaceAll("_", " ").toUpperCase();
}

function CleanForComparison(str: string): string {
  return str.replaceAll("_", " ").toLowerCase().trim();
}

function ClueAlreadyUsed(clueCategory: string, existingClues: TClue[]): boolean {
  return existingClues.some((existingClue) => existingClue.category === clueCategory);
}

function GetRandomClueCategory(
  countryData: TCountry,
  existingClues: TClue[]
): TValidClueCategories {
  const randNumber = Math.floor(Math.random() * 999999);
  // this does weird -1 and +1 stuff to avoid showing the first key in the object (the answer)
  const randClueKeyindex = (randNumber % (Object.keys(countryData).length - 1)) + 1;
  const randClueCategory = Object.keys(countryData)[randClueKeyindex] as TValidClueCategories;

  if (ClueAlreadyUsed(randClueCategory, existingClues) || countryData[randClueCategory] === "NA") {
    return GetRandomClueCategory(countryData, existingClues);
  }
  return randClueCategory;
}

function GetRandomCountryName(allCountryNames: TValidCountry[]): TValidCountry {
  const randValidIndex = Math.floor((Math.random() * 99999999) % allCountryNames.length);
  return allCountryNames[randValidIndex];
}

function GetRandomCountry(): TCountry {
  const allCountryNames = Object.keys(CountryData) as TValidCountry[];
  const randCountryName = GetRandomCountryName(allCountryNames);
  return CountryData[randCountryName];
}

function GetRandomClue(correctCountryData: TCountry, existingClues: TClue[]): TClue {
  const randClueCategory = GetRandomClueCategory(correctCountryData, existingClues);
  const randClueFact = correctCountryData[randClueCategory];
  return {
    category: randClueCategory,
    fact: randClueFact,
  };
}

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

  // initialize country and clues on mount only
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
        return;
      }
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
    <div className="gameInputComponent">
      <div className="cluesContainer">
        {clues.map((clue, i) => (
          <div key={i} className="clue">
            <div>{CleanForDisplay(clue.category)}:</div>
            <div>{CleanForDisplay(clue.fact)}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submitGuessHandler}>
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
