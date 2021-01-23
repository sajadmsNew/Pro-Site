import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./map.module.scss";
import common_styles from "../mainPage.module.scss";
import BlueButton from "../../../../components/main-page/inputs/buttons/blueButton";
import map from "../../../../images/map.png";
import { Link } from "gatsby";
class Map extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.map}>
        <div
          className={[
            common_styles.textWrapper,
            styles.textWrapper,
            styles.paragraphGroup,
          ].join(" ")}
        >
          <span
            className={[common_styles.hidePhone, common_styles.smallTitle].join(
              " "
            )}
          >
            {t("Zusatzservice")}{" "}
          </span>
          <span
            className={[
              common_styles.hidePhone,
              common_styles.title,
              common_styles.whiteText,
            ].join(" ")}
          >
            {t(" So profitieren Sie als Industrie-Kunde")}
          </span>

          <p>
            {t(
              " Durch unser flächendeckendes Partnernetzwerk von über 80 Metallrecyclern in der DACH-Region und 100 Hütten weltweit, können wir Ihnen die besten Preise für Ihr Altmetall garantieren."
            )}
          </p>

          <p className={styles.lastParagraph}>
            {" "}
            {t(
              "  Erhalten Sie, unabhängig von Ihrer Ausgangssituation, den besten Preis."
            )}
          </p>

          <Link className={common_styles.link} to="/anfrage">
            {t("Verkaufen sie an uns")}
          </Link>
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={map}
            className={[styles.mapImage, common_styles.sectionImage].join(" ")}
            alt="Austrian and Germany map"
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
          {t(" So profitieren Sie als Industrie-Kunde")}
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

export default withNamespaces()(Map);
