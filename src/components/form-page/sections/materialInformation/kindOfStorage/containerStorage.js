import React from "react";
import { withNamespaces } from "react-i18next";
import Dropdown from "../../../inputs/dropdown/dropdown";
import * as actions from "../../../../../action";
import { connect } from "react-redux";
import { setLeadField } from "../../../../../utils/utils";
import styles from "../materialInformation.module.scss";
import inputStyles from "../../../inputs/input/input.module.scss";
import Input from "../../../inputs/input/input";
import { number } from "prop-types";
import _ from "lodash";

const avaibaleOptions = [
  {
    options: [
      { label: "5m3", value: "5m3" },
      { label: "7m3", value: "7m3" },
      { label: "10m3", value: "10m3" },
      { label: "15m3", value: "15m3" },
    ],
  },
  {
    options: [
      { label: "12m3", value: "12m3" },
      { label: "18m3", value: "18m3" },
      { label: "25m3", value: "25m3" },
      { label: "35m3", value: "35m3" },
      { label: "41m3", value: "41m3" },
    ],
  },
];

class ContainerStorage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: null,
      selectedOption: null,
      selectedSize: null,
      numberOfContainers: null,
      error: null,
    };
  }

  selectOption = async option => {
    await this.setState({
      selectedOption: option,
      selectedSize: null,
      numberOfContainers: null,
    });
    this.updateField();
  };

  onChange = async index => {
    const selectedSize =
      avaibaleOptions[this.state.selectedOption].options[index].label;
    await this.setState({ selectedSize });
    this.updateField();
  };

  onChangeInput = async value => {
    await this.setState({ numberOfContainers: value });
    this.updateField();
  };

  updateField = () => {
    const { selectedSize, numberOfContainers } = this.state;
    const value = selectedSize + " - " + numberOfContainers;
    setLeadField(this.props, value);
    let obj;
    const thereIsASize = selectedSize && selectedSize.length > 0;
    const thereIsANumber = numberOfContainers && numberOfContainers.length > 0;
    if (thereIsASize && thereIsANumber) {
      obj = null;
    } else if (thereIsANumber) {
      obj = { error: "Enter the number of containers that you want to order" };
    } else if (numberOfContainers !== null) {
      obj = { error: "Enter the number of containers that you want to order" };
    }

    this.setState({ error: obj ? obj.error : null });
    this.props.setFormValidity(obj, this.props.id);
  };

  getClassOption = option => {
    if (option === this.state.selectedOption) {
      return " " + styles.selected;
    }
    return "";
  };

  componentDidMount() {
    if (
      this.props.lead &&
      this.props.lead.cart &&
      this.props.lead.cart.length > this.props.cartIndex
    ) {
      const value = this.props.lead.cart[this.props.cartIndex].storageText;
      const parts = value.split("-");
      if (parts.length === 2) {
        let selectedOption;
        const index = _.findIndex(
          avaibaleOptions[0].options,
          o => o.label === parts[0].trim()
        );
        if (index !== -1) {
          selectedOption = 0;
        } else {
          selectedOption = 1;
        }
        this.setState({
          selectedValue: parts[0].trim(),
          selectedSize: parts[0].trim(),
          selectedOption,
          numberOfContainers: parts[1].trim(),
        });
      }
    }
  }

  isAvailableStep = step => {
    switch (step) {
      case 1:
        return this.state.selectedOption !== null;
      case 2:
        return this.state.selectedSize !== null;
      default:
        return false;
    }
  };

  render() {
    const { t } = this.props;

    return (
      <div className={styles.animatedContainerStorage}>
        <span
          className={
            styles.sectionDescription + " " + styles.storageOptionTitle
          }
        >
          {t("Select a size and enter a number of containers")}
        </span>
        <div className={styles.containerStorageButtonsSection}>
          <button
            className={styles.containerStorageButton + this.getClassOption(0)}
            onClick={() => this.selectOption(0)}
          >
            {t("Skip")}
          </button>
          <button
            className={styles.containerStorageButton + this.getClassOption(1)}
            onClick={() => this.selectOption(1)}
          >
            {t("Roll-off container")}
          </button>
        </div>
        {this.isAvailableStep(1) ? (
          <div className={styles.animatedContainerStorageStep2}>
            <Dropdown
              options={avaibaleOptions[this.state.selectedOption].options}
              propagateToParent={this.onChange}
              cartIndex={this.props.cartIndex}
              selectedValue={this.state.selectedValue}
              placeholder={t("containerSize")}
            />
          </div>
        ) : null}
        {this.isAvailableStep(2) ? (
          <div className={styles.animatedContainerStorageStep3}>
            <span
              className={
                styles.sectionDescription + " " + styles.storageOptionTitle
              }
            >
              {t("Please enter the number of containers")}
            </span>
            <Input
              id="containerStorage"
              type="number"
              required={true}
              avoidValidate={true}
              callBackValidation={this.isReadyToContinue}
              placeholder={t("Enter your number here")}
              cartIndex={this.props.cartIndex}
              isSelectedStep={this.props.isSelectedStep}
              propagateToParent={this.onChangeInput}
              value={this.state.numberOfContainers}
              customError={t(
                "Enter the number of containers that you want to order"
              )}
            />
            <div className={styles.loseErrorContainer}>
              <span className={inputStyles.error}>{t(this.state.error)}</span>
            </div>
          </div>
        ) : null}
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
)(withNamespaces()(ContainerStorage));
