import React from "react";
import { withNamespaces } from "react-i18next";
import Dropdown from "../../../inputs/dropdown/dropdown";
import * as actions from "../../../../../action";
import { connect } from "react-redux";
import { getLeadField, setLeadField } from "../../../../../utils/utils";
import styles from "../materialInformation.module.scss";
import inputStyles from "../../../inputs/input/input.module.scss";

class LooseStorage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.firstInputRef = React.createRef();
    this.secondInputRef = React.createRef();
    this.thirdInputRef = React.createRef();
  }

  onChange = evt => {
    const firstValue = this.firstInputRef.current.value;
    const secondValue = this.secondInputRef.current.value;
    const thirdValue = this.thirdInputRef.current.value;

    const value = firstValue + "x" + secondValue + "x" + thirdValue;
    setLeadField(this.props, value);
    let obj;
    if (
      firstValue &&
      firstValue.length > 0 &&
      secondValue &&
      secondValue.length > 0 &&
      thirdValue &&
      thirdValue.length > 0
    ) {
      obj = null;
    } else {
      obj = { error: "Number required" };
    }
    this.setState({ error: obj ? obj.error : null });
    this.props.setFormValidity(obj, this.props.id);
  };

  componentDidMount() {
    if (
      this.props.lead &&
      this.props.lead.cart &&
      this.props.lead.cart.length > this.props.cartIndex
    ) {
      const value = this.props.lead.cart[this.props.cartIndex].storageText;
      const parts = value.split("x");
      if (parts.length === 3) {
        this.firstInputRef.current.value = parts[0].trim();
        this.secondInputRef.current.value = parts[1].trim();
        this.thirdInputRef.current.value = parts[2].trim();
      }
    }
  }

  render() {
    const { t } = this.props;

    let labelClass = inputStyles.label;
    if (this.props.isSelectedStep) {
      labelClass = inputStyles.label + " " + inputStyles.active;
    }

    return (
      <div className={styles.animatedLooseStorage}>
        <div className={styles.loseContainer + " " + inputStyles.inputWrapper}>
          <div className={styles.column + " " + styles.firstColumn}>
            <span className={labelClass}>{t("Max")}</span>
          </div>
          <div className={styles.column}>
            <span className={labelClass}>{t("L(cm)")}</span>
            <input
              type="text"
              onKeyUp={this.onChange}
              ref={this.firstInputRef}
            />
          </div>
          <div className={styles.columnSeparator}>
            <span>x</span>
          </div>
          <div className={styles.column}>
            <span className={labelClass}>{t("B(cm)")}</span>
            <input
              type="text"
              onKeyUp={this.onChange}
              ref={this.secondInputRef}
            />
          </div>
          <div className={styles.columnSeparator}>
            <span>x</span>
          </div>
          <div className={styles.column}>
            <span className={labelClass}>{t("H(cm)")}</span>
            <input
              type="text"
              onKeyUp={this.onChange}
              ref={this.thirdInputRef}
            />
          </div>
        </div>
        <div className={styles.loseErrorContainer}>
          <span className={inputStyles.error}>{t(this.state.error)}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    initialInfo: leadForm.initialInfo,
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    storageTypes: leadForm.initialInfo.storageTypes,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(LooseStorage));
