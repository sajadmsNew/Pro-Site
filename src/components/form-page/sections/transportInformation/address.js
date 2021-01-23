import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./transportInformation.module.scss";

import SelectAddress from "../../inputs/select/selectAddress";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transportInformation_address: false,
      error: null,
      apiLoaded: false,
    };
    this.isReadyToContinue = this.isReadyToContinue.bind(this);
  }

  isReadyToContinue(value) {
    this.setState({ [value.id]: value.error === null }, () => {
      if (this.state.transportInformation_address || value.error !== null) {
        this.props.setFormValidity(value.error, this.props.id, true);
      }
    });
    this.setState({ error: value.error });
  }

  getCountries = () => {
    return this.props.countries;
  };

  isEmptyStep = () => {
    if (this.props.lead.pickupAddress) {
      const street = this.props.lead.pickupAddress.streetAddress;
      const zip = this.props.lead.pickupAddress.zip;
      const country = this.props.lead.pickupAddress.country;
      return !street || !zip || !country;
    }
    return true;
  };

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  componentDidMount() {
    this.props.setFormValidity(false, this.props.id);
    this.props.componentLoaded();
    // PlacesAutocomplete needs google api loaded before create the component
    // Otherwise it will fail
    let poll = setInterval(() => {
      if (window.google) {
        this.setState({ apiLoaded: true });
        clearInterval(poll);
      }
    }, 500);
  }

  render() {
    const { t } = this.props;
    let containerClass = "";
    if (this.isSelectedStep(this.props.id)) {
      containerClass = " active";
    }

    if (this.props.hideFilled && !this.isEmptyStep()) {
      return null;
    }

    return (
      <div
        className={`${styles.clickHere} ` + containerClass}
        id={this.props.id}
        onClick={() => this.props.selectStep(this.props.id)}
      >
        <span className={styles.sectionDescription}>
          {t("Can you tell us where can we pick up the scrap metal?")}{" "}
        </span>
        {this.state.apiLoaded ? (
          <SelectAddress
            id="transportInformation_address"
            label="Street"
            options={this.props.addressOptions}
            values={[]}
            searchable={true}
            clearable={true}
            callBackValidation={this.isReadyToContinue}
            field="pickupAddress"
            required={true}
            placeholder={t("Enter you street address")}
            isSelectedStep={this.isSelectedStep(this.props.id)}
          />
        ) : null}
        <span className={styles.error}> {t(this.state.error)} </span>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    hideFilled: leadForm.hideFilled,
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    countries: leadForm.initialInfo.countries,
    selectedStep: leadForm.selectedStep,
    addressOptions: leadForm.addressOptions,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Address));
