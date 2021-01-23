import React from "react";
import Helmet from "react-helmet";

import LeftSide from "../../components/form-page/leftSide/";
import FormContainer from "../../components/form-page/formContainer/FormContainer";
import Layout from "../../layouts";
import Finish from "../../components/form-page/finish/finish";
import Redirect from "../../components/form-page/finish/redirect";
import Confirmation from "../../components/form-page/confirmation/confirmation";
import styles from "./index.module.scss";
import * as actions from "../../action";
import { connect } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/i18n";
import { navigate } from "gatsby";
import Grid from "@material-ui/core/Grid";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsLoaded: 0,
      defaultRegularly: null,
    };
  }

  componentDidMount() {
    var params = loadUrlParameters(this.props);
    const magicLink = null;
    this.props.loadInitialInfo();
    this.props.loadLead(magicLink);

    if (params.get("confirm") && params.get("confirm") === "true") {
      this.props.showConfirmationScreen();
    }

    if (params.get("regularly")) {
      this.setState({ defaultRegularly: params.get("regularly") === "true" });
    }

    if (params.get("recurrence")) {
      this.setState({ defaultRegularly: params.get("recurrence") === "multi" });
    }
  }

  setElementsLoad = val => {
    // When a lead is loaded using a magic link it could produce an infinite loop
    if (val !== this.state.elementsLoaded) {
      this.setState({ elementsLoaded: val });
    }
  };

  redirectToThankYou() {
    navigate("/thank-you");
    return null;
  }
  render() {
    return (
      <I18nextProvider i18n={i18n} defaultNS={"default"}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Anfrage Schrott24 PRO │ Altmetallverwertung – Komplettlösung für
            Industrie & Gewerbe
          </title>
          <meta
            name="description"
            content="Beste Preise für Altmetall und Komplettlösung für Altmetall Recycling in Industrie und Gewerbe. Jetzt Angebot erhalten."
          />

          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfDwQK3D11mRl5zact_Hk-QctWpfqEkKk&libraries=places"></script>
        </Helmet>
        {this.props.confirm ? (
          <div>
            {" "}
            <Confirmation />
          </div>
        ) : (
          <div>
            {this.props.finished ? (
              this.redirectToThankYou()
            ) : this.props.redirectToWebshopValue ? ( //redirectToThankYou()
              <Redirect />
            ) : (
              <div className={styles.pageWrapper}>
                <Grid container spacing={3} className={styles.pageContainer}>
                  <Grid item xs={12} md={4} className={styles.leftSideWrapper}>
                    <LeftSide elementsLoaded={this.state.elementsLoaded} />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <FormContainer
                      setElementsLoad={this.setElementsLoad}
                      defaultRegularly={this.state.defaultRegularly}
                    />
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        )}
      </I18nextProvider>
    );
  }
}

function loadUrlParameters(props) {
  const url = new URL(props.location.href);
  const params = url.searchParams;

  const lead = { ...props.lead };
  let shouldUpdate = false;
  if (params.get("materialId")) {
    if (lead.cart.length > 0) {
      lead.cart[0].productID = params.get("materialId");
      shouldUpdate = true;
    } else {
      console.error("There is no cart item");
    }
  }

  if (params.get("weight")) {
    if (lead.cart.length > 0) {
      lead.cart[0].quantity = params.get("weight");
      shouldUpdate = true;
      const mu = params.get("mu");
      // Make default weight is Kg
      if (!mu || mu !== "t") {
        lead.cart[0].quantity /= 1000;
      }
    } else {
      console.error("There is no cart item");
    }
  }

  if (params.get("hideFilled")) {
    props.showHideFilled("true" === params.get("hideFilled"));
  }

  let token = null;
  if (params.get("token")) {
    token = params.get("token");
  }

  props.loadLead(token);

  if (shouldUpdate) {
    props.updateLead(token, lead);
  }
  return params;
}
function mapStateToProps({ leadForm }) {
  return {
    confirm: leadForm.confirm,
    finished: leadForm.finished,
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    redirectToWebshopValue: leadForm.redirectToWebshop,
  };
}

export default connect(mapStateToProps, actions)(IndexPage);
