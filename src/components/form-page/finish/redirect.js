import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import styles from "./redirect.module.scss";
import logo from "../../../images/schrottLoader.gif";
import _ from "lodash";
import * as actions from "../../../action";
import { connect } from "react-redux";

class Redirect extends Component {
  componentDidMount() {
    setTimeout(() => {
      const cartItem = this.props.lead.cart[0];
      // This value should be procided in Kg and now is in Ton
      const quantity = parseInt(cartItem.quantity * 1000);
      const productId = cartItem.productID;
      // TODO this url should be changed depending on webshop
      const url = `https://www.schrott24.de/co/cart/${productId}?&quantity=${quantity}`;
      window.location = url;
    }, 5000);
  }

  render() {
    const { t } = this.props;

    return (
      <div className={styles.container}>
        <div>
          <div className={styles.separator}></div>
          <div className={styles.innerContainer}>
            <img src={logo} alt="Loader logo" />
            <span className={styles.text}>
              {t(
                " We are scanning our database to provide you with the best prices & transport options"
              )}
            </span>
          </div>
          <div className={styles.separator}></div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Redirect));
