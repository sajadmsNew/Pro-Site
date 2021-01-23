import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./tag.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { getLeadField } from "../../../../utils/utils";

class SingleTag extends React.Component {
  constructor(props) {
    super(props);
    this.selected = this.selected.bind(this);
  }

  selected() {
    this.props.onClick(this.props);
  }

  componentDidMount() {
    this.props.setFormValidity(null, this.props.id);
  }

  getClassName = () => {
    const selected = getLeadField(this.props) === this.props.value;
    return selected ? styles.active : "";
  };

  render() {
    const { t } = this.props;

    return (
      <div className={this.getClassName()}>
        <div className={styles.tagsWrapper} onClick={this.selected} style={this.props.className}>
          {t(this.props.label)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(SingleTag));
