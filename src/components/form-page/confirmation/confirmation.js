import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import _ from "lodash";

class Confirmation extends Component {
  render() {
    const { t } = this.props;

    return <p>{t("Thank you for confirming")}</p>;
  }
}

export default withNamespaces()(Confirmation);
