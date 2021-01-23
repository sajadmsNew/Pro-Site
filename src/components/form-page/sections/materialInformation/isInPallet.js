import React from "react";
import styles from "./materialInformation.module.scss";
import { withNamespaces } from "react-i18next";
import Info from "../../inputs/info/info";
import Suggest from "../../inputs/suggest/suggest";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class IsInPallet extends React.Component {
  constructor(props) {
    super(props);
    this.isReadyToContinue = this.isReadyToContinue.bind(this);
  }

  componentDidMount() {
    this.props.setFormValidity(false, this.props.id);
    this.props.componentLoaded();
  }

  isReadyToContinue(value) {
    this.props.setFormValidity(value.error, this.props.id);
  }

  render() {
    const { t } = this.props;

    return (
      <div
        className={`${styles.clickHere} ${styles.section}`}
        id={this.props.id}
      >
        <span className={styles.sectionDescription}>
          {" "}
          {t(
            "Is the product secured on pallets? Is the metal contained in some way or is it just on the floor? Please describe or select words that would best describe how it looks."
          )}
          <Info
            message={t(
              "Product criteria - explanation by Traders needs to be provided so that the customers know we understand them"
            )}
          />
        </span>
        <Suggest
          id="isInPallet"
          label="Product criteria"
          placeholder={t("Start typing or select from suggestions")}
          field="materialCriteria"
          initialTags={this.props.initialInfo.productCriterias.mostUsed}
          allTags={this.props.initialInfo.productCriterias.allCriterias}
          cartIndex={this.props.cartIndex}
          required={true}
          callBackValidation={this.isReadyToContinue}
        />
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    initialInfo: leadForm.initialInfo,
    magicLinkToken: leadForm.magicLinkToken,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(IsInPallet));
