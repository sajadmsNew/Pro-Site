import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Radio from "../../inputs/checkbox/radio";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class SellMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      selected: null,
    };
  }

  componentDidMount() {
    this.props.setFormValidity(false, this.props.id);

    this.props.componentLoaded();
  }

  setSelected = value => {
    this.props.setFormValidity(null, this.props.id);
    if (value) {
      this.props.addCartItem();
    } else {
      this.props.goToNextStep();
    }
    // Always select false. If user select YES this button will be hidden. If the button is shown should be false
    this.setState({ selected: false });
  };

  shouldShow = () => {
    return this.props.cartIndex === this.props.lead.cart.length - 1;
  };

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  componentWillReceiveProps() {
    if (this.props.loadedFromToken) {
      this.setState({ selected: false });
    }
  }

  render() {
    const { t } = this.props;
    let containerClass = "";
    if (this.isSelectedStep(this.props.id)) {
      containerClass = " active";
    }

    if (!this.shouldShow()) {
      return null;
    } else {
      return (
        <div
          className={
            `${styles.productConditions} ${styles.section}` + containerClass
          }
          id={this.props.id}
          onClick={() => this.props.selectStep(this.props.id)}
        >
          <span
            className={[styles.sectionDescription, styles.bigMarginBottom].join(
              " "
            )}
          >
            {t("Would you like to sell more products?")}
          </span>
          <Radio
            selected={this.state.selected}
            setSelected={this.setSelected}
          />
        </div>
      );
    }
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
    loadedFromToken: leadForm.loadedFromToken,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(SellMore));
