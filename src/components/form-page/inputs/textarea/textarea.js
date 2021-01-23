import React from "react";
import styles from "./textarea.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { setLeadField, getLeadField } from "../../../../utils/utils";

class Textarea extends React.Component {
  onBlur = event => {
    if (this.props.field) {
      const value = event.currentTarget.value;
      setLeadField(this.props, value);
    }
  };

  render() {
    const { t } = this.props;

    return (
      <div className={styles.textareaWrapper}>
        <label>{this.props.label}</label>
        <textarea
          className={styles.textarea}
          type="texarea"
          placeholder={this.props.placeholder}
          onBlur={this.onBlur}
          defaultValue={getLeadField(this.props)}
        />
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Textarea));
