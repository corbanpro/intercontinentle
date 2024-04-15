/* CountryModal.tsx */
import React from 'react';
import './CountryModal.css';
import { TCountryData } from 'types/Country';

interface Props {
  correctCountryData: TCountryData;
}


function selectRandomElements(array: string[], count: number): string[] {
  return array.sort(() => Math.random() - 0.5).slice(0, count);
}

function CountryModal({ correctCountryData }: Props) {
  const eligibleFacts = Object.keys(correctCountryData).filter((fact) => !["Country", "Abbreviation", "Paragraph"].includes(fact));

  function createFacts() {
    let facts = [];
    // select 6 random facts from eligibleFacts
    facts = selectRandomElements(eligibleFacts, 6);
    let counter = 1;
    const modalFacts = document.querySelector('.modal-facts');
    
    for (const fact of facts) {
      const factElement = document.querySelector(`.modal-fact-${counter}`);
      if (factElement) {
        factElement.innerHTML = `${fact}: ${correctCountryData[fact].value}`;
        modalFacts?.appendChild(factElement);
      }
      counter++;
    }
    return facts;
  }

  createFacts();

  return (
    <>
      <div id="modal-container" className="modal-container">
        <div className="modal-grid">
          <div className="modal-header">
            <div className="country-flag">
              <img src={`../../data/countryFlags/png250px/${correctCountryData.Abbreviation.value.toLowerCase()}.png`} alt={correctCountryData.Abbreviation.value} />
            </div>
            <div className="country-title-pop">
              <h2>{correctCountryData.Country.value} ({correctCountryData.Abbreviation.value})</h2>
              <p>population: {correctCountryData.Population.value}</p>
            </div>
            <div className="country-baseline-facts">
              <p>capital: {correctCountryData?.CapitalCity.value}</p>
              <p>largest city: {correctCountryData?.LargestCity.value}</p>
              <p>GDP: {correctCountryData?.GDP.value}</p>
            </div>
          </div>
          <div className="modal-paragraph">
            {correctCountryData.Paragraph.value}
          </div>
          <div className="modal-facts">
            <div className="modal-fact-1"></div>
            <div className="modal-fact-2"></div>
            <div className="modal-fact-3"></div>
            <div className="modal-fact-4"></div>
            <div className="modal-fact-5"></div>
            <div className="modal-fact-6"></div>
            <div className="modal-refresh-facts">
              <button onClick={createFacts}>refresh</button>
            </div>
          </div>
          <div className="modal-map">
            {/* /data/countryOutlines/all/{correctCountryData}/512.png */}
            <img src="" alt="map" />
            <div className="modal-lat-long">
              <p>atitude: {correctCountryData.Latitude.value}</p>
              <p>longitude: {correctCountryData.Longitude.value}</p>
            </div>
          </div>
        </div>
        <div className="modal-buttons">buttons</div>
      </div>
    </>
  )
}

export default CountryModal;