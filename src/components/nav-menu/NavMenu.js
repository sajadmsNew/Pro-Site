import React from "react";

import { withNamespaces } from "react-i18next";

import DesktopNavMenu from "./desktopNavMenu";
import MobileNavMenu from "./mobileNavMenu";
class NavMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;

    return (
      <nav>
        <DesktopNavMenu />
        <MobileNavMenu />
      </nav>
    );
  }
}

export default withNamespaces()(NavMenu);
