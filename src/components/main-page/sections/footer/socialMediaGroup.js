import React from "react";
import { withNamespaces } from "react-i18next";

import styles from "./linksSection.module.scss";
import youtube from "../../../../images/youtube.png";
import facebook from "../../../../images/facebook.png";
import twitter from "../../../../images/twitter.png";
import linkedin from "../../../../images/linkedin.png";

class SocialMediaGroup extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <div className={[styles.columnEuro, styles.officeTimes].join(" ")}>
          <span className={styles.sectionTitle}>Office info</span>
          <div className={styles.timesContainer}>
            <h4>08:00 – 17:00 (Mo–Do)</h4>
            <h4>08:00 – 15:00 (Fr)</h4>
            <h4>
              <a href="/sitemap-at.xml">Sitemap</a>
            </h4>
          </div>
          <div className={styles.logoWrapper}>
            <a href="https://www.linkedin.com/company/schrott-24/">
              <div className={styles.logoContainer}>
                <img src={linkedin} alt="Linkedin logo" />
              </div>
            </a>
            <a href="https://www.facebook.com/schrott24/">
              <div className={styles.logoContainer}>
                <img src={facebook} alt="Facebook logo" />
              </div>
            </a>
            <a href="https://twitter.com/schrott24">
              <div className={styles.logoContainer}>
                <img src={twitter} alt="Twitter logo" />
              </div>
            </a>
            <a href="https://www.youtube.com/channel/UCrIvaKJkiu_V8EQMS8yBv2Q">
              <div className={styles.logoContainer}>
                <img src={youtube} alt="Youtube logo" />
              </div>
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default withNamespaces()(SocialMediaGroup);
