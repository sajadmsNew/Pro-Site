import React from "react";
import { withNamespaces } from "react-i18next";
import footerStyles from "./footer.module.scss";
import styles from "./awardsSection.module.scss";
import award1 from "../../../../images/award1.png";
import award2 from "../../../../images/award2.png";
import award3 from "../../../../images/award3.png";
import award4 from "../../../../images/award4.png";
import award5 from "../../../../images/award5.png";
import award6 from "../../../../images/award6.png";
import award7 from "../../../../images/award7.png";
import award8 from "../../../../images/award8.png";

class AwardSection extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <div
          className={[
            styles.awardsContainer,
            footerStyles.desktop,
            footerStyles.tablet,
          ].join(" ")}
        >
          <div className={styles.container}>
            <div className={styles.awardContainerFirst}>
              <div>
                <img src={award1} />
              </div>
              <div>
                <img src={award2} />
              </div>
              <div>
                <img src={award3} />
              </div>
              <div>
                <img src={award4} />
              </div>
              <div>
                <img src={award5} />
              </div>
            </div>
            <div className={styles.awardContainerSecond}>
              <div>
                <img src={award6} />
              </div>
              <div>
                <img src={award7} />
              </div>
              <div>
                <img src={award8} />
              </div>
            </div>
          </div>
        </div>

        <div
          className={[styles.awardsContainer, footerStyles.mobile].join(" ")}
        >
          <div className={styles.container}>
            <div className={styles.imagesContainer}>
              <div>
                <img src={award1} />
              </div>
              <div>
                <img src={award2} />
              </div>
            </div>

            <div className={styles.imagesContainer}>
              <div>
                <img src={award3} />
              </div>
              <div>
                <img src={award4} />
              </div>
            </div>

            <div className={styles.imagesContainer}>
              <div>
                <img src={award5} />
              </div>

              <div>
                <img src={award6} />
              </div>
            </div>

            <div className={styles.imagesContainer}>
              <div>
                <img src={award7} />
              </div>
              <div>
                <img src={award8} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withNamespaces()(AwardSection);
