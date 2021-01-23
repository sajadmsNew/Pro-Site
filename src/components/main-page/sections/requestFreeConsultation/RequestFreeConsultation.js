import React from "react";
import { withNamespaces } from "react-i18next";
import { Link } from "gatsby";
import styles from "./requestFreeConsultation.module.scss";
import requestFreeConsultation from "../../../../images/requestFreeConsultation.svg";
import common_styles from "../mainPage.module.scss";

class RequestFreeConsultation extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.requestFreeConsultation}>
        <div className={styles.imageWrapper}>
          <img src={requestFreeConsultation} alt="Laptop" />
        </div>

        <div className={styles.textWrapper}>
          <span
            className={[
              common_styles.smallTitle,
              common_styles.whiteText,
              styles.smallTitle,
            ].join(" ")}
          >
            {t("Beartung")}{" "}
          </span>

          <p>
            {" "}
            {t(
              "Sie möchten unser Know-how aus erster Hand erleben? Fordern Sie eine kostenlose Beratung an."
            )}
          </p>
          <Link className={common_styles.orangeButtonLink} to="/anfrage">
            {t("Jetzt anfragen")}
          </Link>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(RequestFreeConsultation);
