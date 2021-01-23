import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Radio from "../../inputs/checkbox/radio";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Input from "../../inputs/input/input";

class TargetPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      error: null,
      targetPrice: null,
      text: null,
    };
    this.setSelected = this.setSelected.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.componentLoaded();
  }

  isReadyToContinue = value => {
    this.isValid(value.error);
  };

  setSelected(value) {
    this.setState({ selected: value }, () => {
      this.isValid();
      if (!value) {
        this.props.goToNextStep();
      }
    });
  }

  isValid(error) {
    const cartItem = this.props.lead.cart[this.props.cartIndex];
    const { targetPrice, isTargetPrice } = cartItem;
    // There is no button option selected or true is selected but no monthly option selected then is incorrect
    if (
      isTargetPrice == null ||
      (isTargetPrice && targetPrice == null) ||
      error
    ) {
      this.props.setFormValidity(false, this.props.id);
    } else {
      this.props.setFormValidity(null, this.props.id);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if ("cartIndex" in props) {
      const selected = props.lead.cart[props.cartIndex]["isTargetPrice"];
      return { selected };
    }
    return null;
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  getSufixText = () => {
    const { targetPrice } = this.state;
    if (targetPrice) {
      return `= ${targetPrice} €/t`;
    }
    return null;
  };

  updateStateField = value => {
    this.setState({ targetPrice: value });
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
        onClick={() => this.props.selectStep(this.props.id)}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <span className={styles.sectionDescription}>
              {t("Do you have a target price in mind for this material?")}
            </span>
          </Grid>
          <Grid item xs={12}>
            <Radio
              selected={this.state.selected}
              setSelected={this.setSelected}
              field="isTargetPrice"
              cartIndex={this.props.cartIndex}
              defaultValue={this.props.isTargetPrice}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={styles.targetPriceWrapper}>
              {this.state.selected ? (
                <div className={styles.animatedContainer}>
                  <span className={styles.prefix}>€</span>
                  <Input
                    id="targetPrice"
                    type="number"
                    label="To help us get you a satisfactory result it would help us if you enter your target price here"
                    required={true}
                    callBackValidation={this.isReadyToContinue}
                    placeholder={t("Enter your price here")}
                    field="targetPrice"
                    cartIndex={this.props.cartIndex}
                    className={
                      styles.materialAndQuality_input +
                      " " +
                      styles.target_input
                    }
                    isSelectedStep={this.isSelectedStep(this.props.id)}
                    propagateToParent={this.updateStateField}
                    customError={t("Enter your wanted price in numbers")}
                  />
                  <span className={styles.sufix}>{this.getSufixText()}</span>
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>
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

export default connect(mapStateToProps, actions)(withNamespaces()(TargetPrice));
