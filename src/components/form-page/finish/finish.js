import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import styles from "./finish.module.scss";
import logo from "../../../images/schrottLogo.svg";
import _ from "lodash";
import Helmet from "react-helmet";

class Finish extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({ 
          portalId: "2937843",
          formId: "8d52f486-b870-411b-9299-1c6f276335ae",
          target: "#hubspotForm",
        });
      }
    });
  }

  render() {
    const { t } = this.props;

    return (
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="Loader logo" />

        <div className={styles.innerContainer}>
          <div>
            <p className={styles.title}>
              {t("Thank you for contacting us for your sale.")}
            </p>
            <p className={styles.text}>
              {t(
                "We just sent you a confirmation email with the summary & next steps. If you cant find the email check your spam folder."
              )}
            </p>
          </div>

          <div id="hubspotForm" className={styles.hubspotForm}></div>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(Finish);
