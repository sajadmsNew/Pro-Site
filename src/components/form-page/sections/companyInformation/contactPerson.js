import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./companyInformation.module.scss";
import Input from "../../inputs/input/input";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class ContactPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_person: false,
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
          {t(
            "Are you the contact person for this deal? Can you write your name?"
          )}
        </span>
        <Input
          id="contact_person"
          label="Contact person"
          placeholder={t("Enter your full name here")}
          field="seller.contactPerson"
          required={true}
          callBackValidation={this.isReadyToContinue}
          isSelectedStep={this.isSelectedStep(this.props.id)}
          customError={t("Enter your full name to proceed")}
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

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(ContactPerson));
