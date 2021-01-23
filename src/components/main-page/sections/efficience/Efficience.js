import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./efficience.module.scss";
import common_styles from "../mainPage.module.scss";

import { Link } from "gatsby";
import efficience from "../../../../images/efficience.png";

class Efficience extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.efficience}>
        <div
          className={[common_styles.textWrapper, styles.textWrapper].join(" ")}
        >
          <span
            className={[common_styles.hidePhone, common_styles.smallTitle].join(
              " "
            )}
          >
            {t("Alleinstellungsmerkmal")}{" "}
          </span>
          <span
            className={[
              common_styles.hidePhone,
              common_styles.title,
              common_styles.whiteText,
            ].join(" ")}
          >
            {t("Digitale")} {t("Effizienz")}
          </span>

          <p>
            {t(
              "Wir setzen auf digitale Tools in der Schrottindustrie, um Ihren ROI durch mehr Effizienz und Transparenz zu steigern."
            )}
          </p>
          <p>
            {t(
              "Durch das dynamische Matching mit der aktuellen Nachfrage machen wir den Markt effizienter und können den besten Preis garantieren."
            )}
          </p>
          <p className={styles.lastParagraph}>
            {" "}
            {t(
              "Wir digitalisieren die Altmetallbranche, um die Effizienz des Marktes zu steigern, komplexe Abläufe zu erleichtern und Qualität zu garantieren."
            )}
          </p>

          <Link className={common_styles.link} to="/anfrage">
            {t("Verkaufen sie an uns")}
          </Link>
        </div>
        <div className={styles.imageWrapper}>
          <img
            className={common_styles.sectionImage}
            src={efficience}
            alt="Graph"
          />
        </div>

        <span
          className={[
            common_styles.title,
            styles.sectionTitle,
            common_styles.whiteText,
            common_styles.mobileTitle,
          ].join(" ")}
        >
          {t("Digitale")} {t("Effizienz")}
        </span>

        <span
          className={[
            common_styles.smallTitle,
            common_styles.whiteText,
            common_styles.mobileTitleSmall,
          ].join(" ")}
        >
          {t("Alleinstellungsmerkmal")}{" "}
        </span>
      </div>
    );
  }
}

export default withNamespaces()(Efficience);
