import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./consulting.module.scss";
import consulting from "../../../../images/consulting.svg";
import common_styles from "../mainPage.module.scss";

import { Link } from "gatsby";
class Consulting extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.consulting}>
        <div
          className={[
            common_styles.whiteText,
            styles.textWrapper,
            common_styles.textWrapper,
          ].join(" ")}
        >
          <span
            className={[
              common_styles.smallTitle,
              common_styles.whiteText,
              styles.subTitle,
            ].join(" ")}
          >
            {t("Zusatzservice")}{" "}
          </span>

          <span
            className={[
              common_styles.whiteText,
              common_styles.title,
              styles.sectionTitle,
            ].join(" ")}
          >
            {t("Consulting")}
          </span>

          <p>
            {t(
              "Fundierte Beratung und Information sind die Basis jeder durchdachten Entscheidung. Profitieren Sie vom Experten Know-How der Metallindustrie, mit über 40 Jahren Erfahrung aus grundlegender und technischer Marktanalyse."
            )}
          </p>
          <p>
            {t(
              "Wir ermöglichen Lösungen auch für komplexere Aufträge, indem wir persönlich mit Ihnen auf Ihre individuelle Ausgangslage eingehen."
            )}
          </p>
          <p>
            {t(
              "Ganz gleich, ob es sich um eine vollständige Optimierung der Art und Weise handelt, wie Sie Ihr Material lagern, oder um die Unterstützung des komplexen Ausschreibungsprozesses."
            )}{" "}
          </p>
          <p className={styles.lastParagraph}>
            {" "}
            {t(
              "Unser Fokus liegt darauf, sicherzustellen, dass Sie sowohl Ihre Kosten senken als auch den größten Wert aus Ihrem Altmetall erzielen können."
            )}
          </p>

          <Link className={common_styles.link} to={"/anfrage"}>
            {t("Verkaufen sie an uns")}
          </Link>
        </div>

        <div>
          <img
            src={consulting}
            className={[common_styles.sectionImage, styles.sectionImage].join(
              " "
            )}
            alt="Laptop"
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
          {t("Consulting")}
        </span>

        <span
          className={[
            common_styles.smallTitle,
            common_styles.whiteText,
            common_styles.mobileTitleSmall,
          ].join(" ")}
        >
          {t("Zusatzservice")}{" "}
        </span>
      </div>
    );
  }
}

export default withNamespaces()(Consulting);
