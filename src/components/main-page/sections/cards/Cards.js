import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./cards.module.scss";
import common_styles from "../mainPage.module.scss";

import screenIcon from "../../../../images/screenIcon.png";
import gearsIcon from "../../../../images/gearsIcon.png";

import { Link } from "gatsby";
class Cards extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.groupOfCards}>
        <div className={styles.backgroundContainer}>
          <div className={styles.backgroundSquare}></div>
          <div className={styles.backgroundDiagonal}></div>
        </div>

        <div className={styles.cardWrapper}>
          <div className={styles.card}>
            <div className={styles.orangeLine}></div>

            <img src={screenIcon} alt="screen Icons" />
            <span className={styles.textColumnTitle}>{t("Spot Verkauf")}</span>
            <div className={styles.textColumn}>
              <p>
                {" "}
                {t(
                  "Wir garantieren den besten Preis, indem wir den Markt durch dynamisches Matching effizienter machen"
                )}
              </p>

              <Link
                className={common_styles.orangeButtonLink}
                to="/anfrage?regularly=false"
              >
                {t("starten")}
              </Link>
            </div>
          </div>

          <div className={[styles.card, styles.cardLast].join(" ")}>
            <div className={styles.orangeLine}></div>
            <img src={gearsIcon} alt="Gear icons" />
            <span className={styles.textColumnTitle}>{t("Regelmäßig")}</span>
            <div className={styles.textColumn}>
              <p>
                {" "}
                {t(
                  "Durch unser flächendeckendes Netzwerk aus Altmetallhändlern und Logistikpartnern, können wir Ihnen optimale und individuelle Komplettlösungen anbieten."
                )}
              </p>

              <Link
                className={common_styles.orangeButtonLink}
                to="/anfrage?regularly=true"
              >
                {t("starten")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Cards);
