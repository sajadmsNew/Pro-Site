import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./onlineDocuments.module.scss";
import onlineDocuments from "../../../../images/onlineDocuments.svg";
import BlueButton from "../../../../components/main-page/inputs/buttons/blueButton";
import common_styles from "../mainPage.module.scss";

import { Link } from "gatsby";
class OnlineDocuments extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.onlineDocuments}>
        <span
          className={[
            common_styles.smallTitle,

            common_styles.mobileTitleSmall,
          ].join(" ")}
        >
          {t("So funktioniert’s")}
        </span>
        <span
          className={[
            common_styles.title,
            styles.sectionTitle,

            common_styles.mobileTitle,
          ].join(" ")}
        >
          {t("Online alle Dokumente")} <br />
          {t("an einem Ort! — Transparente Abwicklung")}
        </span>

        <div className={styles.imageWrapper}>
          <img
            className={common_styles.sectionImage}
            src={onlineDocuments}
            alt="Laptop"
          />
        </div>

        <div
          className={[common_styles.textWrapper, styles.textWrapper].join(" ")}
        >
          <span
            className={[common_styles.hidePhone, common_styles.smallTitle].join(
              " "
            )}
          >
            {t("So funktioniert’s")}
          </span>
          <span
            className={[
              common_styles.hidePhone,
              common_styles.title,
              styles.title,
            ].join(" ")}
          >
            {t("Online alle Dokumente")} <br />
            {t("an einem Ort! — Transparente Abwicklung")}
          </span>

          <p>
            {t(
              "Dokumentierte Qualitätsprüfung des Altmetalls und Wiegeschein sowie Transaktionen sind jederzeit online in Ihrem Account abrufbar."
            )}
          </p>

          <p className={styles.lastParagraph}>
            {" "}
            {t(
              "Alle Buchhaltungs — und gesetzlich vorgeschriebenen Unterlagen (gemäß der Gewerberbeabfallverordnung August 2017) sind in Ihrem Konto gespeichert und online zugänglich."
            )}
          </p>

          <Link className={common_styles.link} to="/anfrage">
            {t("Verkaufen sie an uns")}
          </Link>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(OnlineDocuments);
