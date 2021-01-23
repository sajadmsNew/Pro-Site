import styles from "./LeftSide.module.scss";
import React from "react";
import Step from "./Step";
import logo from "../../../images/schrottLogo.svg";
import * as actions from "../../../action";
import { connect } from "react-redux";
import { MATERIAL_STEPS_NUMBER, TRANSPORT_STEPS_NUMBER } from "../../constants";
import { withNamespaces } from "react-i18next";

const stepInfo = [
  {
    title: "Material information",
    info: [
      "Receive personal service tailored to your business",
      "Get only relevant offers",
      "Online access to all documentation",
    ],
  },
  {
    title: "Transport information",
    info: [
      "We find the most efficient collecting system for your business",
      "We handle all the logistics of transporting your scrap",
    ],
  },

  {
    title: "Company information",
    info: ["We make the payouts seamless", "We protect your data"],
  },
];

class LeftSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsPerSection: [0, 8, 12],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const cartItems = props.lead.cart.length;
    const stepsPerSection = [
      0,
      MATERIAL_STEPS_NUMBER * cartItems - 1,
      MATERIAL_STEPS_NUMBER * cartItems + TRANSPORT_STEPS_NUMBER - 1,
    ];
    return { stepsPerSection };
  }

  render() {
    const { t } = this.props;

    return (
      <div className={styles.leftSide}>
        <div className={styles.leftSideContainer}>
          <div className={styles.leftSideGroup}>
            <img src={logo} alt="schrott logo" />
            <h2 className={styles.mainTitle}>
              {t("Get the best price in 3 steps")}
            </h2>
            {stepInfo.map((val, index) => {
              return (
                <Step
                  key={"step_" + index}
                  index={index}
                  title={val.title}
                  info={val.info}
                  isEnabled={
                    this.state.stepsPerSection[index] <=
                    this.props.elementsLoaded
                  }
                />
              );
            })}
          </div>
          <span className={styles.telephone}>
            {t("tel: +43 720 0054 4155")}
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(LeftSide));
