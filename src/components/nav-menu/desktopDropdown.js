import React from "react";
import styles from "./navMenu.module.scss";

import { withNamespaces } from "react-i18next";

import ExpandMore from "@material-ui/icons/ExpandMore";

class NavMenuDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ dropdownOpen: false });
  }
  open() {
    this.setState({ dropdownOpen: true });
  }
  render() {
    const { t } = this.props;

    return (
      <div
        className={styles.dropdownLabelContainer}
        onMouseEnter={() => this.open()}
        onMouseLeave={() => this.close()}
      >
        <span>{this.props.dropdownLabel}</span>
        <ExpandMore className={styles.expandMore} />

        {this.state.dropdownOpen ? (
          <div className={styles.navDropdownContainer}>
            <div className={styles.navMenuTriangleUpOutside}>
              <div className={styles.navMenuTriangleUp}></div>
            </div>
            <div className={styles.navListItems}>
              {this.props.linkList.map(element => (
                <a href={element.url}>{element.label}</a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withNamespaces()(NavMenuDropdown);
