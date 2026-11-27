import Link from "next/link";
import { useRouter } from "next/router";
import { LOCALES, useLocale } from "../i18n";

const LABELS = { en: "EN", ja: "日本語" } as const;

/** Bottom-right pill to switch the page between English and Japanese. */
const LanguageSwitch = () => {
  const current = useLocale();
  // Stay on the same page, just in the other language.
  const { pathname } = useRouter();
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
            href={pathname}
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
