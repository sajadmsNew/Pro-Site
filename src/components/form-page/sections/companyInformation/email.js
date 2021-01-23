import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./companyInformation.module.scss";
import Input from "../../inputs/input/input";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_email: false,
    };
    this.isReadyToContinue = this.isReadyToContinue.bind(this);
  }
  componentDidMount() {
    this.props.setFormValidity(false, this.props.id);
    this.props.componentLoaded();
  }

  isReadyToContinue(value) {
    this.setState({ [value.id]: value.error === null });
    this.props.setFormValidity(
      value.error === false ? null : value.error,
      this.props.id
    );
  }

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
          {t("What is your email?")}
        </span>
        <Input
          id="contact_email"
          label="Email"
          placeholder={t("Enter your email here")}
          field="seller.contactPersonEmail"
          type="email"
          required={true}
          callBackValidation={this.isReadyToContinue}
          isSelectedStep={this.isSelectedStep(this.props.id)}
          customError={t("Enter a real email to proceed")}
        />
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Email));
