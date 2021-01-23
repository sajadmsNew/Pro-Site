import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./truck.module.scss";
import common_styles from "../mainPage.module.scss";
import yellowTruck from "../../../../images/yellowTruck.png";

import { Link } from "gatsby";
class Truck extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.truck}>
        <div className={styles.truckImageContainer}>
          <img
            className={common_styles.sectionImage}
            src={yellowTruck}
            alt="Computer"
          />
        </div>
        <div
          className={[
            common_styles.sectionText,

            styles.truckTextContainer,
          ].join(" ")}
        >
          <p>
            {t(
              "Unser Ausgedehntes Netzwerk an Schrotthändlern und Logistikpartnern, ermöglicht optimale und individuelle Komplettlösungen."
            )}
          </p>
          <p className={styles.lastParagraph}>
            {t(
              "Umweltgerechtes Recycling durch staatlich geprüfte Altmetallprofis. Einsparung von Energie und CO2 durch Wiederverwertung von vorhandenen Ressourcen."
            )}
          </p>

          <Link className={common_styles.link} to="/anfrage">
            {t("Verkaufen Sie an uns")}
          </Link>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Truck);
