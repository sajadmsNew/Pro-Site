import React from "react";
import { withNamespaces } from "react-i18next";

import completeSolution from "../../../../images/completeSolution.png";
import check from "../../../../images/check.svg";
import common_styles from "../mainPage.module.scss";
import { Link } from "gatsby";
import styles from "./completeSolution.module.scss";
class CompleteSolution extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.completeSolution}>
        <div className={styles.mobileTitles}>
          <span
            className={[
              common_styles.mobileTitleSmall,
              common_styles.smallTitle,
              styles.lightGrey,
            ].join(" ")}
          >
            {t("So funktioniert’s")}{" "}
          </span>

          <span
            className={[
              common_styles.mobileTitleSmall,
              common_styles.title,
            ].join(" ")}
          >
            {t("Die Komplettlösung")}{" "}
            {t("für Altmetall-Recycling in der Industrie 4.0")}
          </span>
        </div>
        <div>
          <img
            className={styles.completeSolutionImage}
            src={completeSolution}
            alt="Men working"
          />
        </div>
        <div className={styles.textContainer}>
          <span
            className={[
              common_styles.hidePhone,
              common_styles.smallTitle,
              styles.lightGrey,
            ].join(" ")}
          >
            {t("So funktioniert’s")}{" "}
          </span>

          <span
            className={[common_styles.hidePhone, common_styles.title].join(" ")}
          >
            {t("Die Komplettlösung")}{" "}
            {t("für Altmetall-Recycling in der Industrie 4.0")}
          </span>
          <div className={styles.listOfTextWrapper}>
            <div>
              <img src={check} alt="Check symbol" />
              {t(
                "Gemeinsam mit unserem engagierten Kunden-Erfolgs-Manager Ihre Prozesse optimieren"
              )}
            </div>

            <div>
              <img src={check} alt="Check symbol" />
              {t(
                "Umfassende logistische Unterstützung und Serviceleistungen für jede Transaktion."
              )}
            </div>

            <div>
              <img src={check} alt="Check symbol" />
              {t(
                "Schnelle Auszahlungen nach einer transparenten Qualitätsprüfung durch unsere Partner."
              )}
            </div>

            <div className={styles.lastContainerList}>
              <img src={check} alt="Check symbol" />
              {t(
                "Online-Zugang zu Informationen über Transaktionen, Dokumente und Fortschritt."
              )}
            </div>

            <Link className={common_styles.link} to="/anfrage">
              {t("Verkaufen sie an uns")}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(CompleteSolution);
