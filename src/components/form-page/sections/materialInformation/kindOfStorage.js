import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "../transportInformation/transportInformation.module.scss";
import Dropdown from "../../inputs/dropdown/dropdown";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { getLeadField } from "../../../../utils/utils";
import KindOfStorageExtra from "./kindOfStorage/kindOfStorageExtra";

class KindOfStorage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedOption: null,
    };
  }

  componentDidMount() {
    this.props.setFormValidity(false, this.props.id);
    this.props.componentLoaded();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.initialInfo && props.initialInfo.storageTypes) {
      const value = getLeadField(props);
      if (value) {
        let selectedIndex = 0;
        for (let i = 0; i < props.initialInfo.storageTypes.length; i++) {
          if (value === props.initialInfo.storageTypes[i].value) {
            selectedIndex = i;
            break;
          }
        }
        const selectedOption = props.storageTypes[selectedIndex];
        return { selectedIndex, selectedOption };
      }
      return null;
    }
    return null;
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  onChange = index => {
    const selectedOption = this.props.storageTypes[index];
    this.setState({ selectedOption });
    if (selectedOption.value === "other") {
      this.props.setFormValidity(null, this.props.id, true);
    } else {
      this.props.setFormValidity(false, this.props.id);
    }

    this.resetStorageText();
  };

  resetStorageText = () => {
    const lead = { ...this.props.lead };
    lead.cart[this.props.cartIndex].storageText = "";
    this.props.updateLead(this.props.magicLinkToken, lead);
  };

  render() {
    const { t } = this.props;

    const isSelectedStep = this.isSelectedStep(this.props.id);
    let containerClass = "";
    if (isSelectedStep) {
      containerClass = " active";
    }

    return (
      <div
        className={`${styles.clickHere} ${styles.section}` + containerClass}
        id={this.props.id}
        onClick={() => this.props.selectStep(this.props.id)}
      >
        <span className={styles.sectionDescription}>
          {t("How is the material currently stored?")}
        </span>
        <Dropdown
          options={this.props.storageTypes}
          selectedIndex={this.state.selectedIndex}
          propagateToParent={this.onChange}
          field="storageType"
          cartIndex={this.props.cartIndex}
        />
        <KindOfStorageExtra
          selectedOption={this.state.selectedOption}
          cartIndex={this.props.cartIndex}
          isSelectedStep={isSelectedStep}
          setFormValidity={this.props.setFormValidity}
          id={this.props.id}
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

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(KindOfStorage));
