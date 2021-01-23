import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Info from "../../inputs/info/info";
import Input from "../../inputs/input/input";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class HasChemicalAnalysis extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setFormValidity(null, this.props.id);  
       this.props.componentLoaded();
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
        className={`${styles.clickHere} ${styles.section}` + containerClass}
        id={this.props.id}
        onClick={() => {
          this.props.selectStep(this.props.id);
        }}
      >
        <span className={styles.sectionDescription}>
          {" "}
          {t(
            "If you have done a chemical analysis you can enter the number here"
          )}
          <Info
            message={t(
              "Material number - Show a couple of examples from our BO currently"
            )}
          />
        </span>

        <Input
          id="chemical_analisis"
          type="number"
          label="Material number"
          required={false}
          callBackValidation={this.isReadyToContinue}
          placeholder={t("Enter your material number")}
          field="materialNumber"
          cartIndex={this.props.cartIndex}
          isSelectedStep={this.isSelectedStep(this.props.id)}
        />
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(HasChemicalAnalysis));
