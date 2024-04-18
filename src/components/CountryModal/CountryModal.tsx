import React, { useEffect } from "react";
import "./CountryModal.css";
import { TCountryData } from "types/Country";
import { ToolTips } from "data/tooltips";

interface Props {
  correctCountryData: TCountryData;
  closeModal: () => void;
  restartGame: () => void;
  isModalOpen: boolean;
}

function selectRandomElements(array: string[], count: number): string[] {
  return array.sort(() => Math.random() - 0.5).slice(0, count);
}

function CountryModal({ correctCountryData, closeModal, restartGame, isModalOpen }: Props) {
  const eligibleClues = Object.keys(correctCountryData).filter(
    (clue) => !["Country", "Abbreviation", "Paragraph", "Landlocked", "ExportPartners", "Latitude", "Longitude", "Population", "CapitalCity", "LargestCity"].includes(clue)
  );

  function createFacts() {
    let clues = [];
    // select 6 random facts from eligibleFacts
    clues = selectRandomElements(eligibleClues, 6);
    let counter = 1;
    const modalFacts = document.querySelector(".modal-facts");

    for (const clue of clues) {
      const factElement = document.querySelector(`.modal-fact-${counter}`);
      const clueValue = correctCountryData[clue].value;
      const clueText = `${ToolTips[clue].Clue}`;
      if (factElement) {
        factElement.innerHTML = `${clueText}: ${clueValue}`;
        modalFacts?.appendChild(factElement);
      }
      counter++;
    }
    return clues;
  }

  createFacts();

  const openModal = () => {
    const modalBackground = document.getElementById("modal-backdrop");
    const modalContainer = document.getElementById("modal-container");
    modalContainer?.classList.add("show-modal");
    modalContainer?.style.setProperty("display", "flex");
    modalBackground?.style.setProperty("display", "block");
  };

  useEffect(() => {
    if (isModalOpen) {
      openModal();
    }
  }, [isModalOpen]);

  const handleExit = () => {
    const modalBackground = document.getElementById("modal-backdrop");
    const modalContainer = document.getElementById("modal-container");
    modalContainer?.classList.remove("show-modal");
    modalContainer?.style.setProperty("display", "none");
    modalBackground?.style.setProperty("display", "none");

    closeModal();
  };

  const handlePlayAgain = () => {
    restartGame();

    closeModal();
  };

  const abbr = correctCountryData.Abbreviation.value.toLowerCase();
  const flag = require(`../../data/countryFlags/png250px/${abbr}.png`);
  const outline = require(`../../data/countryOutlines/all/${abbr}/512.png`);

  return (
    <>
      <div id="modal-backdrop">
        <div id="modal-container" className="modal-container">
          <div className="modal-grid">
            <div className="modal-header">
              <div className="country-flag">
                <img src={flag} alt={correctCountryData.Abbreviation.value} />
              </div>
              <div className="country-title-pop">
                <h2>
                  {correctCountryData.Country.value} ({correctCountryData.Abbreviation.value})
                </h2>
                <p>population: {correctCountryData.Population.value}</p>
              </div>
              <div className="country-baseline-facts">
                <p>capital: {correctCountryData?.CapitalCity.value}</p>
                <p>largest city: {correctCountryData?.LargestCity.value}</p>
                <p>GDP: {correctCountryData?.GDP.value}</p>
              </div>
            </div>
            <div className="modal-paragraph">{correctCountryData.Paragraph.value}</div>
            <div className="modal-facts">
              <div className="modal-fact-1"></div>
              <div className="modal-fact-2"></div>
              <div className="modal-fact-3"></div>
              <div className="modal-fact-4"></div>
              <div className="modal-fact-5"></div>
              <div className="modal-fact-6"></div>
              <div className="modal-refresh-facts">
                <button className="modal-button" onClick={createFacts}>refresh</button>
              </div>
            </div>
            <div className="modal-map">
              <img src={outline} alt="map" style={{ objectFit: "contain" }} />
              <div className="modal-lat-long">
                <p>latitude: {correctCountryData.Latitude.value}</p>
                <p>longitude: {correctCountryData.Longitude.value}</p>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="modal-button" onClick={handleExit}>Exit</button>
            <button className="modal-button" onClick={handlePlayAgain}>Play Again</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryModal;
