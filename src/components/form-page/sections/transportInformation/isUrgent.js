import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./transportInformation.module.scss";
import SingleTag from "../../inputs/tag/singleTag";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { setLeadField } from "../../../../utils/utils";

class IsUrgent extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { selected: null };
  }

  static getDerivedStateFromProps(props, state) {
    const urgency = props.lead.urgency;
    if (urgency) {
      return { urgency };
    }
    return null;
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
    lead[this.props.field] = value;
    this.props.updateLead(this.props.magicLinkToken, lead);
    this.setState({ selected: value });
  }

  componentDidMount() {
       this.props.componentLoaded();
  }
  render() {
    const { t } = this.props;

    return (
      <div
        className={`${styles.clickHere} ${styles.section}`}
        id={this.props.id}
      >
        <span className={styles.sectionDescription}>
          {t("Is this an urgent deal or will you wait for a better price?")}
        </span>
        <div className={styles.tagWrapper}>
          <SingleTag
            onClick={this.onClick}
            label="24h"
            setFormValidity={this.props.setFormValidity}
            value="1"
            field={this.props.field}
          />
          <SingleTag
            onClick={this.onClick}
            label="1-2 days"
            setFormValidity={this.props.setFormValidity}
            value="2"
            field={this.props.field}
          />
        </div>
        <div className={styles.tagWrapper}>
          <SingleTag
            onClick={this.onClick}
            label="2-3 days"
            setFormValidity={this.props.setFormValidity}
            value="3"
            field={this.props.field}
          />
          <SingleTag
            onClick={this.onClick}
            label="3-5 days"
            setFormValidity={this.props.setFormValidity}
            value="5"
            field={this.props.field}
          />
        </div>
        <div className={styles.tagWrapper}>
          <SingleTag
            onClick={this.onClick}
            label="1-2 weeks"
            setFormValidity={this.props.setFormValidity}
            value="14"
            field={this.props.field}
          />
          <SingleTag
            onClick={this.onClick}
            label="1-3 months"
            setFormValidity={this.props.setFormValidity}
            value="90"
            field={this.props.field}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(IsUrgent));
