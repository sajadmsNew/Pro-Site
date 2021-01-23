import React from "react";
import { withNamespaces } from "react-i18next";
import * as actions from "../../../../../action";
import { connect } from "react-redux";
import Input from "../../../inputs/input/input";
import styles from "../materialInformation.module.scss";

class TextStorage extends React.Component {
  isReadyToContinue = obj => {
    this.props.setFormValidity(obj.error, this.props.id);
  };

  render() {
    const { t, title } = this.props;

    return (
      <div className={styles.animatedTextStorage}>
        <span
          className={
            styles.sectionDescription + " " + styles.storageOptionTitle
          }
        >
          {t(title)}
        </span>
        <Input
          id="textStorage"
          type="number"
          required={true}
          callBackValidation={this.isReadyToContinue}
          placeholder={t("Enter your number here")}
          field={this.props.field}
          cartIndex={this.props.cartIndex}
          isSelectedStep={this.props.isSelectedStep}
        />
      </div>
    );
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

export default connect(mapStateToProps, actions)(withNamespaces()(TextStorage));
