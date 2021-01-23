import i18n from "i18next";
// import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-locize-backend";

i18n
  // .use(LanguageDetector)
  .use(Backend)

  .init({
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
    },
    keySeparator: ">",
    nsSeparator: "|",
    fallbackLng: "de",
    saveMissing: true,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      wait: true,
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
    },
    backend: {
      projectId: "c38c2ae9-2eb0-4522-8442-deff5843930b",
      apiKey: "795aef49-1a7d-445b-9010-5ce3e1ec4886",
      referenceLng: "en",
    },
  });
export default i18n;
