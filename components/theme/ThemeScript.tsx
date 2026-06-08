export function ThemeScript() {
  const script = `
(function () {
  try {
    var key = "officemitra-theme";
    var stored = localStorage.getItem(key);
    var dark =
      stored === "dark" ||
      (stored !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
