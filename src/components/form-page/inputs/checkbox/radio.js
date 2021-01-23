import React from "react";
import styles from "./checkbox.module.scss";
import Button from "@material-ui/core/Button";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { setLeadField } from "../../../../utils/utils";
import Grid from "@material-ui/core/Grid";

class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (typeof this.props.defaultValue === "boolean") {
      const value = this.props.defaultValue;
      setLeadField(this.props, value);
      this.props.setSelected(value);
    }
  }
  onChange = (evt, value) => {
    evt.stopPropagation();
    this.props.setSelected(value);
    // Update value through the server
    if (this.props.field) {
      const lead = { ...this.props.lead };
      setLeadField(this.props, value);
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div className={styles.checkboxWrapper}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Button
              className={
                this.props.selected && this.props.selected != null
                  ? styles.enabled
                  : ""
              }
              onClick={evt => this.onChange(evt, true)}
            >
              {this.props.optionYesLabel ? this.props.optionYesLabel : t("Yes")}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              className={
                !this.props.selected && this.props.selected != null
                  ? styles.enabled
                  : ""
              }
              onClick={evt => this.onChange(evt, false)}
            >
              {this.props.optionNoLabel ? this.props.optionNoLabel : t("No")}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Radio));
