import React from "react";
import { withNamespaces } from "react-i18next";
import DatePickUp from "./datePickUp";
import DoYouProduceMetal from "./doYouProduceMetal";
import HasChemicalAnalysis from "./hasChemicalAnalysis";
import IsInPallet from "./isInPallet";
import MaterialAndQuantity from "./materialAndQuantity";
import ProductConditions from "./productConditions";
import TargetPrice from "./targetPrice";
import SellMore from "./sellMore";
import UploadImages from "./updateImages";
import UploadDocuments from "./uploadDocuments";
import styles from "./materialInformation.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { MATERIAL_STEPS_NUMBER } from "../../../constants";
import KindOfStorage from "./kindOfStorage";
import KindOfTransport from "./kindOfTransport";

class MaterialInformation extends React.Component {
  getStep = number => {
    return this.props.cartIndex * MATERIAL_STEPS_NUMBER + number;
  };

  render() {
    const { t } = this.props;

    return (
      <div className={styles.materialInformation}>
        <h2 className={styles.title}>{t("Material information")}</h2>

        <MaterialAndQuantity
          id={"section_" + this.getStep(0)}
          setFormValidity={this.props.setFormValidity}
          componentLoaded={this.props.componentLoaded}
          cartIndex={this.props.cartIndex}
          updateElementsLoaded={this.props.updateElementsLoaded}
          selectStep={this.props.selectStep}
        />

        {this.props.elementsLoaded > this.getStep(0) ? (
          <DoYouProduceMetal
            id={"section_" + this.getStep(1)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            cartIndex={this.props.cartIndex}
            defaultRegularly={this.props.defaultRegularly}
            goToNextStep={this.props.goToNextStep}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {/*this.props.elementsLoaded > this.getStep(1) ? (
          <ProductConditions
            id={"section_" + this.getStep(2)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            cartIndex={this.props.cartIndex}
            selectStep={this.props.selectStep}
          />
        ) : null*/}

        {/*this.props.elementsLoaded > this.getStep(2) ? (
          <IsInPallet
            id={"section_" + this.getStep(3)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            cartIndex={this.props.cartIndex}
            selectStep={this.props.selectStep}
          />
        ) : null*/}

        {/*this.props.elementsLoaded > this.getStep(2) ? (
          <DatePickUp
            id={"section_" + this.getStep(3)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            field="availableFromDate"
            cartIndex={this.props.cartIndex}
            selectStep={this.props.selectStep}
          />
        ) : null*/}

        {this.props.elementsLoaded > this.getStep(1) ? (
          <UploadImages
            id={"section_" + this.getStep(2)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            field="materialImages"
            cartIndex={this.props.cartIndex}
            goToNextStep={this.props.goToNextStep}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(2) ? (
          <UploadDocuments
            id={"section_" + this.getStep(3)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            field="materialDocuments"
            cartIndex={this.props.cartIndex}
            goToNextStep={this.props.goToNextStep}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {/*this.props.elementsLoaded > this.getStep(4) ? (
          <HasChemicalAnalysis
            id={"section_" + this.getStep(5)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            cartIndex={this.props.cartIndex}
            selectStep={this.props.selectStep}
          />
        ) : null*/}

        {this.props.elementsLoaded > this.getStep(3) ? (
          <TargetPrice
            id={"section_" + this.getStep(4)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            cartIndex={this.props.cartIndex}
            goToNextStep={this.props.goToNextStep}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(4) ? (
          <KindOfStorage
            id={"section_" + this.getStep(5)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            field="storageType"
            cartIndex={this.props.cartIndex}
            goToNextStep={this.props.goToNextStep}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(5) ? (
          <KindOfTransport
            id={"section_" + this.getStep(6)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            field="transportType"
            cartIndex={this.props.cartIndex}
            goToNextStep={this.props.goToNextStep}
            selectStep={this.props.selectStep}
          />
        ) : null}

        {this.props.elementsLoaded > this.getStep(6) ? (
          <SellMore
            id={"section_" + this.getStep(7)}
            setFormValidity={this.props.setFormValidity}
            componentLoaded={this.props.componentLoaded}
            cartIndex={this.props.cartIndex}
            goToNextStep={this.props.goToNextStep}
            selectStep={this.props.selectStep}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(MaterialInformation));
