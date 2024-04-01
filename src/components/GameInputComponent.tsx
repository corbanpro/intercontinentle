/**
 * cowritten component
 */
import React, { useCallback, useEffect, useState } from "react";
import "./GameInputComponent.css";
import { TCountries, TCountry, TClue } from "types/Country";
import CountryJsonData from "data/countries.json";

const CountryData: TCountries = CountryJsonData;

type TGuess = {
  value: string;
  isCorrect: boolean;
};

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

// returns a random country
function GetRandomCountry(allCountryNames: string[]): TCountry {
  const randValidIndex = Math.floor((Math.random() * 99999999) % allCountryNames.length);
  const randCountryName = allCountryNames[randValidIndex];
  return CountryData[randCountryName];
}

function GameInputComponent() {
  // declarations
  const maxGuesses = 10;
  const allCountryNames = Object.keys(CountryData);
  const initialCountryData = GetRandomCountry(allCountryNames);

  const [correctCountryData, setCorrectCountryData] = useState<TCountry>(initialCountryData);
  const [clues, setClues] = useState(GetInitialClues(initialCountryData));
  const [inputValue, setInputValue] = useState("");
  const [userGuesses, setGuesses] = useState<TGuess[]>([]);

  const RestartGame = useCallback(() => {
    const newCountryData = GetRandomCountry(allCountryNames);
    setGuesses([]);
    setClues([]);
    setCorrectCountryData(newCountryData);
    setClues(GetInitialClues(newCountryData));
    setInputValue("");
  }, [allCountryNames]);

  const submitGuessHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
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
    },
    [correctCountryData, clues, inputValue, userGuesses, RestartGame]
  );

  const filteredCountryNames = allCountryNames.filter((country) =>
    country.toLowerCase().includes(inputValue.toLowerCase())
  );
  const showFilteredCountries =
    inputValue && filteredCountryNames.length > 0 && !CountryData[inputValue];

  // development helper: log the correct country
  useEffect(() => {
    console.log(correctCountryData.official_country_name);
  }, [correctCountryData]);

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
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="country-suggestion-container">
          {showFilteredCountries &&
            filteredCountryNames.map((country, i) => {
              if (i > 10) return null;
              return (
                <div key={i}>
                  <button
                    type="button"
                    className="country-suggestion"
                    onClick={() => setInputValue(country)}
                  >
                    {country}
                  </button>
                </div>
              );
            })}
        </div>

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
