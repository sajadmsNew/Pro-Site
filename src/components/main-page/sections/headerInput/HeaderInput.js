import React from "react";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import * as actions from "../../../../action";
import common_styles from "../mainPage.module.scss";
import styles from "./headerInput.module.scss";
import headerImg from "../../../../images/crane_header.png";
import Select from "react-dropdown-select";
import { navigate } from "gatsby";
import _ from "lodash";
import {
  MATERIAL_STEPS_NUMBER,
  TRANSPORT_STEPS_NUMBER,
  COMPANY_INFO_STEPS_NUMBER,
} from "../../../constants";

class HeaderInput extends React.Component {
  style = {
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    boxSizing: "border-box",
    width: "100%",
    height: "76px",
    background: "#FFFFFF",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    textTransform: "capitalize",
    color: "#2E2D45",
  };

  constructor(props) {
    super(props);
    this.state = {
      material: null,
      weight: null,
      error: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loadedFromToken) {
      const numberOfElementsLoaded =
        MATERIAL_STEPS_NUMBER * props.lead.cart.length +
        TRANSPORT_STEPS_NUMBER +
        COMPANY_INFO_STEPS_NUMBER -
        1;
      props.setElementsLoad(numberOfElementsLoaded);
      return { elementsLoaded: numberOfElementsLoaded };
    }
    return null;
  }

  onChange = value => {
    let material = "";
    if (value.length) {
      material = value[0].materialId;
    }
    this.setState({ material });
  };

  onChangeKilos(event) {
    const value = event.currentTarget.value;
    if (value === "" || !isNaN(value)) {
      this.setState({ weight: value, error: null });
    } else {
      this.setState({ weight: null, error: "Enter the quantity to proceed" });
    }
    //new
    if (value !== "") {
      this.setState({ weightInputActive: true });
    } else {
      this.setState({ weightInputActive: false });
    }
  }

  redirect = () => {
    const { material, weight } = this.state;
    if (material && weight) {
      let url = "?materialId=" + material + "&weight=" + weight + "&mu=t";
      navigate("/anfrage" + url);
    } else if (!material) {
      this.setState({ error: "Enter the material to proceed" });
    } else if (!weight) {
      this.setState({ error: "Enter the quantity to proceed" });
    }
  };

  getWeightLabel = () => {
    const { t } = this.props;
    if (this.state.weight) {
      return (
        t("You entered") +
        " " +
        this.getWeightFormatted() +
        " " +
        t("Kilograms")
      );
    }
  };

  getWeightFormatted = () => {
    const value = this.state.weight * 1000;
    // leave undefined to use the browser's locale, or use a string like 'en-US' to override it.
    return value.toLocaleString(undefined);
  };

  keyUp = () => {};

  render() {
    const { t } = this.props;
    let products = _.cloneDeep(this.props.products);

    // This code it's because Select component uses value property of products as a key
    // And there are products repeated because they could have several parents -> repeated values in the collection
    // Because of that the render method causes an error and the dropdown it's not working properly
    if (products) {
      let count = 0;
      products.map(p => {
        p.value = count++;
      });
    }

    return (
      <div className={styles.header}>
        <div className={styles.inputWrapper}>
          <div className={styles.textWrapper}>
            <h1 className={styles.titleWrapper}>
              <span
                className={[common_styles.title, common_styles.whiteText].join(
                  " "
                )}
              >
                {t("Schrott24 bietet")}{" "}
                {t(
                  "Ihnen maßgeschneiderte Lösungen, um den Wert Ihres recycelten Altmetalls zu erhöhen"
                )}
              </span>
            </h1>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.headerMobileImg}>
              <img src={headerImg} alt="crane" />
            </div>
            <span className={styles.formTitle}>
              {t("Was wollen Sie verkaufen?")}
            </span>
            <div className={styles.inputContainer}>
              <div className={styles.materialSelectContainer}>
                <Select
                  style={this.style}
                  placeholder={t("Material") + "  "}
                  searchable={true}
                  clearable={false}
                  options={products}
                  onChange={value => this.onChange(value)}
                  className={styles.selectDropdown + " data-hj-whitelist"}
                  searchBy={"label"}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  // placeholder={t("Weight")}
                  className={styles.amountInput + " data-hj-whitelist"}
                  onKeyUp={value => this.onChangeKilos(value)}
                />
                <label
                  className={this.state.weightInputActive ? styles.active : ""}
                >
                  {t("Weight")}
                </label>

                {this.state.error ? (
                  <span className={styles.errorExplanation}>
                    {t(this.state.error)}
                  </span>
                ) : (
                  <span className={styles.explanation}>
                    {this.getWeightLabel()}
                  </span>
                )}
              </div>
            </div>
            <button className={styles.submitButton} onClick={this.redirect}>
              WEITHER
            </button>
          </div>
          <div className={styles.diagonalBackgroundSquare}></div>
          <div className={styles.diagonalBackgroundLine}></div>
        </div>

        <div className={styles.imageWrapper}>
          <img src={headerImg} alt="crane" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    products: leadForm.initialInfo.products,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(HeaderInput));
