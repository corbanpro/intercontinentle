/* setColorScheme.tsx */
function setColorScheme() {
  // set the color setting button text
  document.getElementById("color-setting")?.innerHTML === "Dark Mode" ? document.getElementById("color-setting")!.innerHTML = "Light Mode" : document.getElementById("color-setting")!.innerHTML = "Dark Mode";

  const root = document.documentElement;
  const darkMode = root.classList.contains("dark-mode");
  
  if (darkMode) {
    // setting light mode
    root.classList.remove("dark-mode");
    root.style.setProperty("--background", "#F8F9F1");
    document.documentElement.style.setProperty("--background-rgb", "248, 249, 241");
    root.style.setProperty("--accent", "#E1F25C");
    document.documentElement.style.setProperty("--accent-rgb", "225, 242, 92");
    root.style.setProperty("--body-text", "#133C55");
    document.documentElement.style.setProperty("--body-text-rgb", "19, 60, 85");
    root.style.setProperty("--header-text", "#133C55");
    document.documentElement.style.setProperty("--header-text-rgb", "19, 60, 85");
    root.style.setProperty("--placeholder", "#8C8C8B");
    document.documentElement.style.setProperty("--placeholder-rgb", "140, 140, 139");
    root.style.setProperty("--photo", "#133C55");
    document.documentElement.style.setProperty("--photo-rgb", "13, 13, 13");
  } else {
    // setting dark mode
    root.classList.add("dark-mode");
    root.style.setProperty("--background", "#0D0D0D");
    document.documentElement.style.setProperty("--background-rgb", "13, 13, 13");
    root.style.setProperty("--accent", "#133C55");
    document.documentElement.style.setProperty("--accent-rgb", "19, 60, 85");
    root.style.setProperty("--body-text", "#E1F25C");
    document.documentElement.style.setProperty("--body-text-rgb", "225, 242, 92");
    root.style.setProperty("--header-text", "#F8F9F1");
    document.documentElement.style.setProperty("--header-text-rgb", "248, 249, 241");
    root.style.setProperty("--placeholder", "#8C8C8B");
    document.documentElement.style.setProperty("--placeholder-rgb", "140, 140, 139");
    root.style.setProperty("--photo", "#F8F9F1");
    document.documentElement.style.setProperty("--photo-rgb", "248, 249, 241");
  }
}

export default setColorScheme;
