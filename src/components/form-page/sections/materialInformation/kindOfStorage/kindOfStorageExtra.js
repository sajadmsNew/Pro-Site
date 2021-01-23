import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "../../transportInformation/transportInformation.module.scss";
import * as actions from "../../../../../action";
import { connect } from "react-redux";
import { getLeadField } from "../../../../../utils/utils";
import LooseStorage from "./looseStorage";
import ContainerStorage from "./containerStorage";
import TextStorage from "./textStorage";

class KindOfStorageExtra extends React.Component {
  getComponent = () => {
    const { selectedOption } = this.props;

    if (selectedOption) {
      switch (selectedOption.value) {
        case "loose":
          return (
            <LooseStorage
              cartIndex={this.props.cartIndex}
              isSelectedStep={this.props.isSelectedStep}
              field="storageText"
              setFormValidity={this.props.setFormValidity}
              id={this.props.id}
            />
          );
        case "container":
          return (
            <ContainerStorage
              cartIndex={this.props.cartIndex}
              isSelectedStep={this.props.isSelectedStep}
              field="storageText"
              setFormValidity={this.props.setFormValidity}
              id={this.props.id}
            />
          );
        case "lattice box":
          return (
            <TextStorage
              title="Please enter the number of gitter boxes"
              cartIndex={this.props.cartIndex}
              isSelectedStep={this.props.isSelectedStep}
              field="storageText"
              setFormValidity={this.props.setFormValidity}
              id={this.props.id}
            />
          );
        case "palette":
          return (
            <TextStorage
              title="Please enter the number of Palletes"
              cartIndex={this.props.cartIndex}
              isSelectedStep={this.props.isSelectedStep}
              field="storageText"
              setFormValidity={this.props.setFormValidity}
              id={this.props.id}
            />
          );
        case "bigbag":
          return (
            <TextStorage
              title="Please enter the number of big bags"
              cartIndex={this.props.cartIndex}
              isSelectedStep={this.props.isSelectedStep}
              field="storageText"
              setFormValidity={this.props.setFormValidity}
              id={this.props.id}
            />
          );
        case "barrel":
          return (
            <TextStorage
              title="Please enter the number of Fass"
              cartIndex={this.props.cartIndex}
              isSelectedStep={this.props.isSelectedStep}
              field="storageText"
              setFormValidity={this.props.setFormValidity}
              id={this.props.id}
            />
          );
        case "other":
          return null;
      }
    }
    return null;
  };

  render() {
    return <>{this.getComponent()}</>;
  }
}

function mapStateToProps({ leadForm }) {
  return {
    initialInfo: leadForm.initialInfo,
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    storageTypes: leadForm.initialInfo.storageTypes,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(KindOfStorageExtra));
