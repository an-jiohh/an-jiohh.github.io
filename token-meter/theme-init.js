// Restore the appearance before the first paint, including when storage is blocked.
try {
  const theme = localStorage.getItem("token-meter-theme");
  if (theme === "light" || theme === "dark") {
    document.documentElement.dataset.theme = theme;
  }
} catch {
  // The system appearance remains available without local storage.
}
