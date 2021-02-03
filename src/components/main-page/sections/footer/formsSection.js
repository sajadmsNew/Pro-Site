import React from "react";
import { withNamespaces } from "react-i18next";
import footerStyles from "./footer.module.scss";
import styles from "./formsSection.module.scss";
import "./hubspot.css";
import footerImgYellow from "../../../../images/pricealarm_mock-up_3.svg";
import footerImgBlue from "../../../../images/marktupdate_mock-up_1.svg";

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
                <div className={styles.headerLeft}>
                  <div className={styles.formTitle}>
                    <div className={styles.preisalarmContainerTitleLeft}>
                      Preisalarm – keine Schrottpreise vom Shop verpassen!
                    </div>
                    <div className={styles.paragraphLeft}>
                      Wöchentlich die Schrott24 Kilopreise direkt in die Inbox!
                    </div>
                  </div>
                  <div className={styles.formImg}>
                    <img src={footerImgYellow} />
                  </div>
                </div>

                <div className={styles.cardContainer}>
                  <div
                    id="preisalarmForm"
                    className="newsletterHubspotFormContainer"
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
                <div className={styles.headerRight}>
                  <div className={styles.formTitle}>
                    <div className={styles.preisalarmContainerTitleRight}>
                      Industriepreis- Entwicklungen
                    </div>
                    <div className={styles.paragraphRight}>
                      Monatlich neutralen Überblick über die Entwicklungen der
                      Altmetalle und Börse erhalten.
                    </div>
                  </div>
                  <div className={styles.formImg}>
                    <img src={footerImgBlue} />
                  </div>
                </div>
                <div className={styles.cardContainer}>
                  <div
                    id="marketupdateForm"
                    className={styles.newsletterHubspotFormContainer}
                    className="newsletterHubspotFormContainer"
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
