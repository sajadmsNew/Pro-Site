import React from "react";
import styles from "./companyInformation.module.scss";
import Textarea from "../../inputs/textarea/textarea";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import HearAbout from "./hearAbout";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { enabled: false };
  }

  enableSendButton = event => {
    const value = event.target.checked;
    this.setState({ enabled: value });
    const lead = { ...this.props.lead };
    lead.trackingInfo.acceptedTerms = value;
    this.props.updateLead(this.props.magicLinkToken, lead);
  };

  isDisabled = () => {
    return this.state.enabled ? "" : "disabled";
  };

  clickHandler = event => {
    this.props.sendConfirmation(this.props.magicLinkToken, this.props.lead);
  };

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  componentDidMount() {
    this.props.componentLoaded();
    this.props.setFormValidity(false, this.props.id);
  }

  render() {
    const { t } = this.props;
    let containerClass = "";
    if (this.isSelectedStep(this.props.id)) {
      containerClass = " active";
    }

    return (
      <div
        className={`${styles.clickHere} ${styles.section}` + containerClass}
        id={this.props.id}
        onClick={() => this.props.selectStep(this.props.id)}
      >
        <span className={styles.sectionDescription}>
          {t("If you have any comments or questions please write them here")}
        </span>
        <Textarea field="sellerComment" placeholder={t("Comment here")} />
        <HearAbout selectStep={this.props.selectStep} />
        <button
          className={styles.sendButton}
          disabled={!this.state.enabled}
          onClick={this.clickHandler}
        >
          {t("SEND")}
        </button>
        <div className={styles.termsAndServiceContainer}>
          <input
            className={styles.termsAndServiceCheckbox}
            type="checkbox"
            onChange={this.enableSendButton}
          />{" "}
          <span className={styles.termsAndService}>
            {t("By proceeding you agree to our")}{" "}
            <a href="https://www.schrott24.de/agb/" target="_blank">
              <b>{t("Terms & Services")}</b>
            </a>
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Comment));
