import React from "react";
import { withNamespaces } from "react-i18next";
import footerStyles from "./footer.module.scss";
import styles from "./formsSection.module.scss";
import "./hubspot.css";
class AwardSection extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "2937843",
          formId: "0f752071-1a90-4ee1-8170-550f79e0be56",
          target: "#preisalarmForm",
        });

        window.hbspt.forms.create({
          portalId: "2937843",
          formId: "d42c5f14-de9e-4b8f-92f8-ab9432c87928",
          target: "#marketupdateForm",
        });
      }
    });
  }
  render() {
    const { t } = this.props;

    return (
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Newsletter</h2>
        <div className={styles.newsletterContainer}>
          <div className={styles.newsletterOuter}>
            <div className={styles.newslettersWrapper}>
              <div className={styles.preisalarmContainer}>
                <img src="https://img.scrap24.com/resize?width=520&height=200&url=https://schrott24web.s3.eu-central-1.amazonaws.com/common/footer_preisalarm.png" />
                <div className={styles.cardContainer}>
                  <span className={styles.preisalarmContainerTitle}>
                    Preisalarm - Keine Schrottpreise verpassen!
                  </span>
                  <p>
                    Wöchentlich die aktuellen Schrott24 Kilopreise per Mail.
                  </p>
                  <div
                    id="preisalarmForm"
                    class="newsletterHubspotFormContainer"
                    className={styles.newsletterHubspotFormContainer}
                  ></div>
                </div>
              </div>
              <div
                className={[
                  styles.preisalarmContainer,
                  styles.marktupdateContainer,
                ].join(" ")}
              >
                <img src="https://img.scrap24.com/resize?width=520&height=200&url=https://schrott24web.s3.eu-central-1.amazonaws.com/common/footer_marketupdate.png" />
                <div className={styles.cardContainer}>
                  <span className={styles.preisalarmContainerTitle}>
                    Schrottpreisindex für Industrie
                  </span>
                  <p>
                    Monatlich ein neutraler Überblick auf die Preisentwicklungen
                    der Altmetalle per Mail erhalten.
                  </p>
                  <div
                    id="marketupdateForm"
                    className={styles.newsletterHubspotFormContainer}
                    class="newsletterHubspotFormContainer"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.blueLineWrapper}>
            <div className={styles.diagonalBlueLine}></div>
            <div className={styles.blueSquareBackground}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(AwardSection);
