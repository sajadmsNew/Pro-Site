import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./transportInformation.module.scss";
import SingleTag from "../../inputs/tag/singleTag";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { setLeadField } from "../../../../utils/utils";
import Grid from "@material-ui/core/Grid";

class LoadingCapability extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selected: null };

    this.onClick = this.onClick.bind(this);
  }

  onClick(element) {
    let value = element.value;
    const previousValue = this.state.selected;
    if (previousValue === value) {
      // Is a deselect event
      value = null;
    }
    // Update data
    const lead = { ...this.props.lead };
    setLeadField(this.props, value);
    this.props.updateLead(this.props.magicLinkToken, lead);
    this.setState({ selected: value });
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  componentDidMount() {
    this.props.componentLoaded();
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
          {t(
            "Can you tell us if you have a forklift or any other loading capability?"
          )}
        </span>
        <div>
          <Grid container spacing={3}>
            {this.props.initialInfo.loadingCapabilities.map((cap, i) => {
              return (
                <Grid item xs={6} key={i}>
                  <SingleTag
                    className={{ maxWidth: "100%" }}
                    onClick={this.onClick}
                    label={cap.fieldName}
                    setFormValidity={this.props.setFormValidity}
                    value={cap.fieldName}
                    field="transport.loadingCapabilities"
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    initialInfo: leadForm.initialInfo,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(LoadingCapability));
