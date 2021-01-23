import React from "react";
import CompanyName from "./companyName";
import Comment from "./comment";
import ContactPerson from "./contactPerson";
import Email from "./email";
import Telephone from "./telephone";
import Vat from "./vat";
import styles from "./companyInformation.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import {
  MATERIAL_STEPS_NUMBER,
  TRANSPORT_STEPS_NUMBER,
} from "../../../constants";
import { withNamespaces } from "react-i18next";
import CompanyType from "./companyType";

class CompanyInformation extends React.Component {
  getStep = number => {
    return (
      this.props.lead.cart.length * MATERIAL_STEPS_NUMBER +
      TRANSPORT_STEPS_NUMBER +
      number -
      1
    );
  };

  render() {
    const { t } = this.props;

    return (
      <div className={styles.CompanyInformation}>
        {this.props.elementsLoaded > this.getStep(0) ? (
          <h2 className={styles.title}>{t("Company information")}</h2>
        ) : null}

        {this.props.elementsLoaded > this.getStep(0) ? (
          <CompanyName
            id={"section_" + this.getStep(1)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            selectStep={this.props.selectStep}
          />
        ) : null}
        {this.props.elementsLoaded > this.getStep(1) ? (
          <ContactPerson
            id={"section_" + this.getStep(2)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(2) ? (
          <Email
            id={"section_" + this.getStep(3)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(3) ? (
          <Telephone
            id={"section_" + this.getStep(4)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(4) ? (
          <Vat
            id={"section_" + this.getStep(5)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            selectStep={this.props.selectStep}
            goToNextStep={this.props.goToNextStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(5) ? (
          <CompanyType
            id={"section_" + this.getStep(6)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(6) ? (
          <Comment
            id={"section_" + this.getStep(7)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
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
)(withNamespaces()(CompanyInformation));
