import React from "react";
import Helmet from "react-helmet";

import Finish from "../../components/form-page/finish/finish";
import styles from "./index.module.scss";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/i18n";

class ThankYouPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsLoaded: 0,
      defaultRegularly: null,
    };
    this.setElementsLoad = this.setElementsLoad.bind(this);
  }

  setElementsLoad(val) {
    this.setState({ elementsLoaded: val });
  }
  render() {
    return (
      <I18nextProvider i18n={i18n} defaultNS={"default"}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Schrott24 PRO │Altmetallverwertung - Komplettlösung für Industrie
            und Gewerbe
          </title>
          <meta
            name="description"
            content="Beste Preise für Altmetall und Komplettlösung für Altmetall Recycling in Industrie und Gewerbe. Jetzt Angebot erhalten."
          />
        </Helmet>
        <div>
          <Finish />
        </div>
      </I18nextProvider>
    );
  }
}

export default ThankYouPage;
