import React from "react";
import { withNamespaces } from "react-i18next";
import footerStyles from "./footer.module.scss";
import styles from "./logoSection.module.scss";
import eu from "../../../../images/eu_blue.png";
import aws from "../../../../images/aws_blue.png";
import sfg from "../../../../images/sfg_blue.png";
import ffg from "../../../../images/ffg_blue.png";
import greenTech from "../../../../images/greenTech_blue.png";
import eden from "../../../../images/eden_blue.png";
class LogoSection extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <div className={styles.darkBlue}>
          <div
            className={[
              styles.logoContainer,
              footerStyles.desktop,
              footerStyles.tablet,
            ].join(" ")}
          >
            <img src={eu} alt="European commission logo" />
            <img src={aws} alt="AWS logo" />
            <img src={sfg} alt="SFG logo" />
            <img src={ffg} alt="FFG logo" />
            <img src={greenTech} alt="GreenTech logo" />
            <img src={eden} alt="Eden logo" />
          </div>

          <div
            className={[footerStyles.mobile, styles.logoContainer].join(" ")}
          >
            <div className={styles.logoWrapperGroup}>
              <div className={styles.logoWrapper}>
                <img src={eu} alt="European commission logo" />
                <img src={aws} alt="AWS logo" />
                <img src={sfg} alt="SFG logo" />
              </div>
              <div className={styles.logoWrapper}>
                <img src={ffg} alt="FFG logo" />
                <img src={greenTech} alt="GreenTech logo" />
                <img src={eden} alt="Eden logo" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withNamespaces()(LogoSection);
