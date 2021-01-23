import React from "react";
import styles from "./navMenu.module.scss";
import { withNamespaces } from "react-i18next";

import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import logo from "../../images/logoSchrottOrange.png";
import NavMenuDropdownList from "./dropdownList";

class MobileNavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  render() {
    const { t } = this.props;
    return (
      <div className={styles.navMobileContainer}>
        <div className={styles.navMenuMobile}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={logo} alt="Schrott logo" />
          </div>

          <div className={styles.accountGroupContainer}>
            <a className={styles.checkoutContainer} href="/co/">
              <ShoppingCartRoundedIcon className={styles.accountLogos} />
            </a>

            <div className={styles.accountContainer}>
              <MenuIcon
                className={styles.accountLogos}
                onClick={() => this.onClick()}
              />
            </div>
          </div>
        </div>
        {this.state.menuOpen ? (
          <div className={styles.mobileMenuWrapper}>
            <div className={styles.modalHeader}>
              <span className={styles.menuModalTitle}>Menü</span>

              <CloseIcon
                className={styles.closeIcon}
                onClick={() => this.onClick()}
              />
            </div>

            <div className={styles.menuGroup}>
              <div className={styles.navMenuDropdownContainer}>
                <NavMenuDropdownList view="mobile" />
              </div>
              <div className={styles.modalFooter}>
                <a className={styles.checkoutContainer} href="/co/">
                  <AccountCircleRoundedIcon className={styles.accountLogos} />
                  <span>Mein Account</span>
                </a>

                <a className={styles.checkoutContainer} href="/co/">
                  <ShoppingCartRoundedIcon className={styles.accountLogos} />
                  <span>Warenkorb</span>
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withNamespaces()(MobileNavMenu);
