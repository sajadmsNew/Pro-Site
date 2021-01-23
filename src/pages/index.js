import React from "react";
import NavMenu from "../components/nav-menu/NavMenu";
import Helmet from "react-helmet";
import HeaderInputSection from "../components/main-page/sections/headerInput/HeaderInput";
import CompleteSolutionSection from "../components/main-page/sections/completeSolution/CompleteSolution";
import Truck from "../components/main-page/sections/truck/Truck";

import Cards from "../components/main-page/sections/cards/Cards";
import MapSection from "../components/main-page/sections/map/Map";
import EfficienceSection from "../components/main-page/sections/efficience/Efficience";
import OnlineDocumentsSection from "../components/main-page/sections/onlineDocuments/OnlineDocuments";
import ConsultingSection from "../components/main-page/sections/consulting/Consulting";
import { Link } from "gatsby";
import RequestFreeConsultationSection from "../components/main-page/sections/requestFreeConsultation/RequestFreeConsultation";
import Footer from "../components/main-page/sections/footer/Footer";

import styles from "./index.module.scss";
import * as actions from "../action";
import { connect } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n/i18n";
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsLoaded: 0,
    };
    this.setElementsLoad = this.setElementsLoad.bind(this);
  }

  componentDidMount() {
    this.props.loadInitialInfo();
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
        <NavMenu />

        <div className={styles.breadcrumb}>
          <a href="https://www.schrott24.at/">Home</a>{" "}
          <span className={styles.separator}>/</span>
          <span> Pro</span>
        </div>

        <HeaderInputSection />

        <CompleteSolutionSection />

        <MapSection />

        <Cards />

        <Truck />

        <EfficienceSection />

        <OnlineDocumentsSection />

        <ConsultingSection />
        <RequestFreeConsultationSection />
        <Footer />
      </I18nextProvider>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {};
}

export default connect(mapStateToProps, actions)(IndexPage);
/*


     

       */
