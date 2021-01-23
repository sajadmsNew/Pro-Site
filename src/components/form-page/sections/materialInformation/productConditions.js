import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Info from "../../inputs/info/info";
import Suggest from "../../inputs/suggest/suggest";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class ProductConditions extends React.Component {
  constructor(props) {
    super(props);
    this.isReadyToContinue = this.isReadyToContinue.bind(this);
  }

  componentDidMount() { 
    this.props.setFormValidity(null, this.props.id);
    
       this.props.componentLoaded();
  
  }

  isReadyToContinue(value) {
    this.props.setFormValidity(value.error, this.props.id);
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  render() {
    const { t } = this.props;
    let containerClass = "";
    if (this.isSelectedStep(this.props.id)) {
      containerClass = " active";
    }

    return (
      <div
        className={
          `${styles.productConditions} ${styles.section}` + containerClass
        }
        id={this.props.id}
        onClick={() => this.props.selectStep(this.props.id)}
      >
        <span className={[styles.sectionDescription,styles.bigMarginBottom].join(" ")}>
          {" "}
          {t(
            "Is the product wet or dry? Can you describe the condition or select the words that best describe it."
          )}
          <Info
            message={t(
              "Product condition - explanation by Traders needs to be provided so that the customers know we understand them"
            )}
          />
        </span>
        <Suggest
          id="suggestProductCondition"
          label="Product condition"
          placeholder={t("Start typing or select from suggestions")}
          field="productCondition"
          initialTags={this.props.initialInfo.productConditions.mostUsed}
          allTags={this.props.initialInfo.productConditions.allConditions}
          cartIndex={this.props.cartIndex}
          callBackValidation={this.isReadyToContinue}
          isSelectedStep={this.isSelectedStep(this.props.id)}
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
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(ProductConditions));
