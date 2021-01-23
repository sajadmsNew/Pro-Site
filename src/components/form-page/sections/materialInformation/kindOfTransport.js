import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Dropdown from "../../inputs/dropdown/dropdown";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { getLeadField } from "../../../../utils/utils";

class KindOfTransport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this.props.setFormValidity(null, this.props.id);
    this.props.componentLoaded();
  }

  static getDerivedStateFromProps(props, state) {
    if ("field" in props) {
      const value = getLeadField(props);
      if (value) {
        let selectedIndex = 0;
        for (let i = 0; i < props.initialInfo.transports.length; i++) {
          if (value === props.initialInfo.transports[i].value) {
            selectedIndex = i;
            break;
          }
        }
        return { selectedIndex };
      }
      return null;
    }
    return null;
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  selectValue = () => {
    this.props.setFormValidity(null, this.props.id, true);
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
            "Do you know what kind of transport we need to send for your metal?"
          )}
        </span>
        <Dropdown
          options={this.props.transports}
          field="transportType"
          cartIndex={this.props.cartIndex}
          selectedIndex={this.state.selectedIndex}
          propagateToParent={this.selectValue}
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
    transports: leadForm.initialInfo.transports,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(KindOfTransport));
