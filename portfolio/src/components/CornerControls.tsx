import LanguageSwitch from "./LanguageSwitch";
import ThemeToggle from "./ThemeToggle";

/** Bottom-right corner: the theme button everywhere, the language switch on the home page. */
const CornerControls = ({ languages }: { languages: boolean }) => (
  <div className="corner-controls">
    <ThemeToggle />
    {languages && <LanguageSwitch />}
  </div>
);

export default CornerControls;
