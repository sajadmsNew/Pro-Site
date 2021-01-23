import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./companyInformation.module.scss";
import Input from "../../inputs/input/input";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import Spinner from "react-spinkit";
import checkmark from "../../../../images/checkmark.png";

class Vat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecking: false,
      needValidation: false,
    };
  }

  componentDidMount() {
    this.props.setFormValidity(null, this.props.id);
    this.props.componentLoaded();
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  validate = () => {
    this.setState({ isChecking: true });
    const vat = this.props.lead.seller.UID;
    if (vat && "" !== vat) {
      this.props.validateVat(vat);
      let poll = setInterval(() => {
        if (!this.props.isValidatingVat) {
          this.setState({
            isChecking: false,
            needValidation: false,
          });
          this.props.setFormValidity(
            !this.props.isValidVat ? false : null,
            this.props.id
          );
          clearInterval(poll);
          if (this.props.isValidVat) {
            this.props.goToNextStep();
          }
        }
      }, 2000);
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ isVatValidated: nextProps.isVatValidated });
  }

  getError = () => {
    if (!this.state.needValidation && this.props.isValidVat !== null) {
      const vat = this.props.lead.seller.UID;
      if (!this.props.isValidVat && vat && "" !== vat) {
        const { t } = this.props;
        return t("This VAT number is not valid");
      }
    }
    return null;
  };

  changeValue = val => {
    let needValidation = true;
    let isValid = false;
    if (!val || val === "") {
      needValidation = false;
      isValid = null;
    }
    this.props.setFormValidity(isValid, this.props.id);
    this.setState({ needValidation });
  };

  getComponentDecoration = () => {
    const { isChecking, needValidation } = this.state;
    const { t, isValidVat } = this.props;

    if (isChecking) {
      return <Spinner name="circle" className={styles.vatLoading} />;
    } else if (needValidation) {
      return (
        <button className={styles.vatButton} onClick={this.validate}>
          {t("Check")}
        </button>
      );
    } else if (isValidVat) {
      return <img src={checkmark} alt="ok" className={styles.vatOkImage} />;
    }
    return null;
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
        <span className={styles.sectionDescription}>
          {t(
            "For easier account set up we would need your company UID/VAT number so please enter it bellow"
          )}
        </span>
        <div className={styles.vatInputContainer}>
          <Input
            label="UID/Vat"
            placeholder={t("Enter the full number here")}
            field="seller.UID"
            isSelectedStep={this.isSelectedStep(this.props.id)}
            toUpperCase={t}
            propagateToParent={this.changeValue}
          />
          {this.getComponentDecoration()}
          <span className={styles.error}>{this.getError()}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    selectedStep: leadForm.selectedStep,
    lead: leadForm.lead,
    isValidVat: leadForm.isValidVat,
    isValidatingVat: leadForm.isValidatingVat,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Vat));
