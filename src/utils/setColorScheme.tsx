/* setColorScheme.tsx */
function setColorScheme() {
  const root = document.documentElement;
  const darkMode = root.classList.contains("dark-mode");
  
  if (darkMode) {
    // setting light mode
    root.style.setProperty("--background", "#F8F9F1");
    root.style.setProperty("--background-rgb", "#F8F9F1");
    root.style.setProperty("--accent", "#E1F25C");
    root.style.setProperty("--accent-rgb", "#E1F25C");
    root.style.setProperty("--body-text", "#133C55");
    root.style.setProperty("--body-text-rgb", "#133C55");
    root.style.setProperty("--header-text", "#133C55");
    root.style.setProperty("--header-text-rgb", "19, 60, 85");
    root.style.setProperty("--placeholder", "#8C8C8B");
    root.style.setProperty("--placeholder-rgb", "140, 140, 139");
    root.style.setProperty("--photo", "#133C55");
    root.style.setProperty("--photo-rgb", "#133C55");
  } else {
    // setting dark mode
    root.classList.add("dark-mode");
    root.style.setProperty("--background", "#0D0D0D");
    root.style.setProperty("--background-rgb", "13, 13, 13");
    root.style.setProperty("--accent", "#225599");
    root.style.setProperty("--accent-rgb", "#225599");
    root.style.setProperty("--body-text", "#F8F9F1");
    root.style.setProperty("--body-text-rgb", "#F8F9F1");
    root.style.setProperty("--header-text", "#F8F9F1");
    root.style.setProperty("--header-text-rgb", "248, 249, 241");
    root.style.setProperty("--placeholder", "#8C8C8B");
    root.style.setProperty("--placeholder-rgb", "140, 140, 139");
    root.style.setProperty("--photo", "#F8F9F1");
    root.style.setProperty("--photo-rgb", "248, 249, 241");
  }
}

export default setColorScheme;
