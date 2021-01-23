import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./companyInformation.module.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class Telephone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    this.props.setFormValidity(false, this.props.id);
    this.props.componentLoaded();
  }

  isReadyToContinue = value => {
    let isValid = null;
    if (!value || value.length < 8) {
      isValid = false;
      this.setState({ error: "Number required" });
    } else {
      this.setState({ error: null });
    }
    this.props.setFormValidity(isValid, this.props.id);
  };

  handleOnChange = value => {
    // Update this value to the server
    const lead = { ...this.props.lead };
    if (!lead.seller) {
      lead.seller = {};
    }
    lead.seller.contactPersonPhone = value;
    this.props.updateLead(this.props.magicLinkToken, lead);

    this.isReadyToContinue(value);
  };

  getFieldValue = () => {
    if (this.props.lead && this.props.lead.seller) {
      return this.props.lead.seller.contactPersonPhone;
    }
    return "";
  };

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

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
          {t("Can you tell us what number to call you on?")}
        </span>
        <PhoneInput
          country={"de"}
          value={this.getFieldValue()}
          onChange={_.debounce(this.handleOnChange, 200)}
          inputClass={styles.phone}
          buttonClass={styles.phoneButton}
          preferredCountries={["at", "de"]}
        />
        <div className={styles.errorContainer}>
          <span className={styles.error}>
            {this.state.error ? t(this.state.error) : ""}
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

export default connect(mapStateToProps, actions)(withNamespaces()(Telephone));
