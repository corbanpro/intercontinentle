/**
 * Corban Procuniar
 */
import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import CountryJsonData from "data/countryData.json";

function CountrySidebar({
  showCountryList,
  duration,
}: {
  showCountryList: boolean;
  duration: number;
}) {
  const countryListRef = useRef(null);
  const width = "22em";
  const countryList = Object.values(CountryJsonData)
    .map((data) => data.Country.value)
    .sort();

  return (
    <Transition
      ref={countryListRef}
      in={showCountryList}
      timeout={duration}
      mountOnEnter
      unmountOnExit
    >
      {(state) => {
        const defaultStyle = {
          position: "absolute",
          height: "100vh",
          top: 0,
          zIndex: 100,
          transition: `width ${duration}ms ease-in-out`,
          overflowX: "hidden",
          whiteSpace: "nowrap",
          textAlign: "left",
          padding: "1.5em 1.5em ",
        };

        const transitionStyles: any = {
          entering: { width: width },
          entered: { width: width },
          exiting: { width: 0 },
          exited: { width: 0 },
        };

        return (
          <div
            className="bg-default"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <h3 style={{ marginBottom: "0.5em" }}>Countries</h3>
            <ul style={{ listStyleType: "disc", padding: "0 1.5em" }}>
              {countryList.map((country, i) => (
                <li key={i}>{country}</li>
              ))}
            </ul>
          </div>
        );
      }}
    </Transition>
  );
}

export default function CountryList({
  showCountryList,
  setShowCountryList,
}: {
  showCountryList: boolean;
  setShowCountryList: (showCountryList: boolean) => void;
}) {
  const countryContainerRef = useRef(null);
  const duration = 300;
  return (
    <Transition
      ref={countryContainerRef}
      in={showCountryList}
      timeout={duration}
      mountOnEnter
      unmountOnExit
    >
      {(state) => {
        const defaultStyle = {
          position: "fixed",
          height: "100vh",
          width: "100%",
          backgroundColor: "#444a",
          top: 0,
          zIndex: 2,
          transition: `background-color ${duration}ms ease-in-out`,
        };

        const transitionStyles: any = {
          entering: { backgroundColor: "#444a" },
          entered: { backgroundColor: "#444a" },
          exiting: { backgroundColor: "#0000" },
          exited: { backgroundColor: "#0000" },
        };

        return (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            onClick={() => setShowCountryList(false)}
          >
            <CountrySidebar
              duration={duration}
              showCountryList={state === "entering" || state === "entered"}
            />
          </div>
        );
      }}
    </Transition>
  );
}

/**
 *
 *
 */
