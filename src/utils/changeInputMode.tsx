function changeInputMode() {
  // This function will change the input mode from text to map and vice versa
  // It will also change the text on the button to reflect the current mode
  document.getElementById("input-setting")?.innerHTML === "Map Input Mode" ? document.getElementById("input-setting")!.innerHTML = "Text Input Mode" : document.getElementById("input-setting")!.innerHTML = "Map Input Mode";

  const mapMode = document.getElementById("map-wrapper");
  if (!mapMode) return;
  if (mapMode.style.display === "none" && mapMode.style.opacity === "0") {
    mapMode.style.display = "block";
    mapMode.style.opacity = "1";
  } else {
    mapMode.style.display = "none";
    mapMode.style.opacity = "0";
  }
}

export default changeInputMode;