import React from "react";
import { withNamespaces } from "react-i18next";

import FormsSection from "./formsSection";

import AwardsSection from "./awardsSection";
import LogoSection from "./logoSection";
import LinksSection from "./linksSection";
class Footer extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div>
        <FormsSection />
        <AwardsSection />
        <LogoSection />
        <LinksSection />
      </div>
    );
  }
}

export default withNamespaces()(Footer);
