import React from "react";
import { withNamespaces } from "react-i18next";
import Address from "./address";
import IsUrgent from "./isUrgent";
import LoadingCapability from "./loadingCapability";
import styles from "./transportInformation.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { MATERIAL_STEPS_NUMBER } from "../../../constants";

class TransportInformation extends React.Component {
  getStep = number => {
    return this.props.lead.cart.length * MATERIAL_STEPS_NUMBER + number - 1;
  };

  render() {
    const { t } = this.props;

    return (
      <div className={styles.transportInformation}>
        {this.props.elementsLoaded > this.getStep(0) ? (
          <h2 className={styles.title}>{t("Transport information")}</h2>
        ) : null}

        {this.props.elementsLoaded > this.getStep(0) ? (
          <Address
            id={"section_" + this.getStep(1)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(1) ? (
          <LoadingCapability
            id={"section_" + this.getStep(2)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            field="transport.loadingCapabilities"
            selectStep={this.props.selectStep}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(TransportInformation));
