import React from "react";

import { withNamespaces } from "react-i18next";

import MobileDropdown from "./mobileDropdown";
import DesktopDropdown from "./desktopDropdown";
class Dropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;

    return (
      <>
        {this.props.view === "desktop" ? (
          <DesktopDropdown
            view={this.props.view}
            key={this.props.key}
            dropdownLabel={this.props.dropdownLabel}
            linkList={this.props.linkList}
          />
        ) : (
          <MobileDropdown
            openKey={this.props.openKey}
            updateKey={this.props.updateKey}
            view={this.props.view}
            key={this.props.key}
            element={this.props.element}
            dropdownLabel={this.props.dropdownLabel}
            linkList={this.props.linkList}
          />
        )}
      </>
    );
  }
}

export default withNamespaces()(Dropdown);
