import Link from "next/link";
import { LOCALES, useLocale } from "../i18n";

const LABELS = { en: "EN", ja: "日本語" } as const;

/** Bottom-right pill to switch the home page between English and Japanese. */
const LanguageSwitch = () => {
  const current = useLocale();
  return (
    <nav className="lang-switch" aria-label="Language / 言語">
      {LOCALES.map((locale) =>
        locale === current ? (
          <span key={locale} className="lang-option is-current" aria-current="true" lang={locale}>
            {LABELS[locale]}
          </span>
        ) : (
          <Link
            key={locale}
            href="/"
            locale={locale}
            className="lang-option"
            lang={locale}
            hrefLang={locale}
          >
            {LABELS[locale]}
          </Link>
        ),
      )}
    </nav>
  );
};

export default LanguageSwitch;
