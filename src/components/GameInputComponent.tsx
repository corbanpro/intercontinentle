/* GameInputComponent.tsx */
import React, { useCallback, useEffect, useState } from "react";
import "./GameInputComponent.css";
import { TClue, TCountries, TCountryData, TGuess } from "types/Country";
import CountryJsonData from "data/countryData.json";
import Map from "./Map/Map";
import { ToolTips } from "data/tooltips";
import CountryModal from "./CountryModal/CountryModal";

const CountryData: TCountries = CountryJsonData;

function CleanForComparison(str: string): string {
  return str.replaceAll("_", " ").toLowerCase().trim();
}

function ClueAlreadyUsed(clueCategory: string, existingClues: TClue[]): boolean {
  return existingClues.some((existingClue) => existingClue.category === clueCategory);
}

function GetRandomClueCategory(countryData: TCountryData, existingClues: TClue[]): string {
  const randNumber = Math.floor(Math.random() * 999999);
  const allClueCategories = Object.keys(countryData).filter(
    (clue) => !["Country", "Abbreviation", "Paragraph", "Landlocked"].includes(clue)
  );
  const randClueCategory = allClueCategories[randNumber % allClueCategories.length];

  if (
    ClueAlreadyUsed(randClueCategory, existingClues) ||
    countryData[randClueCategory].value === ""
  ) {
    return GetRandomClueCategory(countryData, existingClues);
  }
  return randClueCategory;
}

function GetRandomClue(correctCountryData: TCountryData, existingClues: TClue[]): TClue {
  const randClueCategory = GetRandomClueCategory(correctCountryData, existingClues);
  const randClueFact = correctCountryData[randClueCategory];
  return {
    category: randClueCategory,
    fact: randClueFact.value,
  };
}

function GetInitialClues(correctCountryData: TCountryData): TClue[] {
  const newClues: TClue[] = [];
  const numclues = 3;
  for (let i = 0; i < numclues; i++) {
    newClues.push(GetRandomClue(correctCountryData, newClues));
  }
  return newClues;
}

function GetRandomCountry(allCountryAbbrs: string[]): TCountryData {
  const randValidIndex = Math.floor((Math.random() * 99999999) % allCountryAbbrs.length);
  const randCountryName = allCountryAbbrs[randValidIndex];
  return CountryData[randCountryName];
}

function GameInputComponent({ showMap }: { showMap: boolean }) {
  const maxGuesses = 10;
  const allCountryAbbrs = Object.keys(CountryData);
  const initialCountryData = GetRandomCountry(allCountryAbbrs);

  const [correctCountryData, setCorrectCountryData] = useState<TCountryData>(initialCountryData);
  const [clues, setClues] = useState<TClue[]>(GetInitialClues(initialCountryData));
  const [inputValue, setInputValue] = useState<string>("");
  const [userGuesses, setGuesses] = useState<TGuess[]>([]);

  const RestartGame = useCallback(() => {
    const newCountryData = GetRandomCountry(allCountryAbbrs);
    setGuesses([]);
    setClues([]);
    setCorrectCountryData(newCountryData);
    setClues(GetInitialClues(newCountryData));
    setInputValue("");
  }, [allCountryAbbrs]);

  function submitGuessHandler(guess: string | undefined, e?: React.FormEvent<HTMLFormElement>) {
    if (e) e.preventDefault();
    console.log("submitting guess: ", guess);

    let isCorrect = false;
    if (guess) {
      isCorrect =
        CleanForComparison(guess) === CleanForComparison(correctCountryData.Country.value);
    }
    const userGuess = { value: guess ?? "", isCorrect };

    if (isCorrect) {
      const modalContainer = document.getElementById("modal-container");
      modalContainer?.classList.add("show-modal");
      modalContainer?.style.setProperty("display", "flex");

      // TODO: implement modal close button, play again button
      // const playAgain = window.confirm(
      //   "Congratulations! You guessed the correct country! Play again?"
      // );
      // if (playAgain) {
      //   RestartGame();
      // }
      return;
    }
    if (userGuesses.length >= maxGuesses) {
      const playAgain = window.confirm(
        `Sorry, you didn't guess the correct country. The correct country was ${correctCountryData.Country.value}. Play again?`
      );
      if (playAgain) {
        RestartGame();
      }
      return;
    }

    setClues([...clues, GetRandomClue(correctCountryData, clues)]);
    setGuesses([...userGuesses, userGuess]);
    setInputValue("");
  }

  const allCountryNames = Object.values(CountryData).map((country) => country.Country.value);

  const filteredCountryNames = allCountryNames.filter((country) =>
    country?.toLowerCase()?.includes(inputValue?.toLowerCase())
  );
  const showFilteredCountries = inputValue !== "";

  useEffect(() => {
    console.log(correctCountryData.Country.value);
  }, [correctCountryData]);

  return (
    <>
      <div className="game-input-component" data-testid="game-input-component">
        {showMap ? (
          <Map submitGuessHandler={submitGuessHandler} />
        ) : (
          <form onSubmit={(e) => submitGuessHandler(inputValue, e)}>
            <div className="form-container">
              <div className="input-box-wrapper">
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
                        <button
                          key={i}
                          type="button"
                          className="country-suggestion"
                          onClick={() => setInputValue(country)}
                        >
                          {country}
                        </button>
                      );
                    })}
                </div>
              </div>
              <div className="country-submit-button">
                <input className="guess-submit" type="submit" value="make a guess"></input>
              </div>
            </div>
          </form>
        )}

        <div className="game-logic-container">
          <div className="clues-wrapper">
            <h3>Clues:</h3>
            {clues.map((clue, i) => (
              <div key={i} className="clue">
                <div className="clue-category">{ToolTips[clue.category].Clue}</div>
                <div className="clue-fact">{clue.fact}</div>
              </div>
            ))}
          </div>
          <div className="guesses-wrapper">
            <div className="guess-wrapper">
              <h3>Guesses:</h3>
              <ul>
                {userGuesses.map((entry, i) => (
                  <li key={i} className={entry.isCorrect ? "correct" : "incorrect"}>
                    {entry.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CountryModal correctCountryData={correctCountryData} />
    </>
  );
}

export default GameInputComponent;
