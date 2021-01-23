import React from "react";
import styles from "./navMenu.module.scss";
import logo from "../../images/logoSchrottOrange.png";
import { withNamespaces } from "react-i18next";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";

import NavMenuDropdownList from "./dropdownList";
class DesktopNavMenu extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className={styles.navMenu}>
        <div className={styles.dropdownGroup}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="Schrott logo" />
          </div>

          <NavMenuDropdownList view="desktop" />
        </div>
        <div className={styles.accountGroupContainer}>
          <a className={styles.accountContainer} href="/partner/">
            <AccountCircleRoundedIcon className={styles.accountLogos} />
            <span>Mein Account</span>
          </a>

          <a className={styles.checkoutContainer} href="/co/">
            <ShoppingCartRoundedIcon className={styles.accountLogos} />
            <span>Warenkorb</span>
          </a>
        </div>
      </div>
    );
  }
}

export default withNamespaces()(DesktopNavMenu);
