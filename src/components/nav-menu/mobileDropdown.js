import React from "react";
import styles from "./navMenu.module.scss";

import { withNamespaces } from "react-i18next";

import ExpandMore from "@material-ui/icons/ExpandMore";

import ExpandLess from "@material-ui/icons/ExpandLess";
class NavMenuDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.click = this.click.bind(this);
  }

  click() {
    if (this.props.openKey === this.props.element) {
      this.props.updateKey("");
    } else {
      this.props.updateKey(this.props.element);
    }
  }

  itemStyle = {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.001em",
    fontStyle: "normal",
    fontWeight: "500",
  };
  render() {
    const { t } = this.props;

    if (this.props.linkList) {
      return (
        <>
          <div
            className={[
              styles.dropdownLabelContainer,
              this.props.openKey === this.props.element
                ? styles.expanded
                : null,
            ].join(" ")}
            onClick={() => this.click()}
          >
            {this.props.openKey === this.props.element ? (
              <ExpandLess className={styles.expandMore} />
            ) : (
              <ExpandMore className={styles.expandMore} />
            )}
            <span>{this.props.dropdownLabel}</span>
          </div>

          {this.props.openKey === this.props.element ? (
            <div className={styles.navDropdownContainer}>
              <div className={styles.navListItems}>
                {this.props.linkList.map(element => (
                  <a href={element.url}>{element.label}</a>
                ))}
              </div>
            </div>
          ) : null}
        </>
      );
    } else {
      return (
        <>
          <div
            className={[
              styles.dropdownLabelContainer,
              this.props.openKey === this.props.element
                ? styles.expanded
                : null,
            ].join(" ")}
            style={{ paddingLeft: "40px" }}
          >
            <a href={`/${this.props.dropdownLabel}`} style={this.itemStyle}>
              {this.props.dropdownLabel}
            </a>
          </div>
        </>
      );
    }
  }
}

export default withNamespaces()(NavMenuDropdown);
