import React from "react";
import styles from "./FormContainer.module.scss";
import MaterialInformation from "../sections/materialInformation/MaterialInformation";
import TransportInformation from "../sections/transportInformation/TransportInformation";
import CompanyInformation from "../sections/companyInformation/CompanyInformation";
import ClickHere from "../inputs/buttons/clickHere";
import scrollTo from "gatsby-plugin-smoothscroll";
import { navigate } from "@reach/router";
import * as actions from "../../../action";
import { connect } from "react-redux";
import {
  MATERIAL_STEPS_NUMBER,
  TRANSPORT_STEPS_NUMBER,
  COMPANY_INFO_STEPS_NUMBER,
} from "../../constants";
import _ from "lodash";

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementsLoaded: 0,
      isFormValid: false,
      errorElements: [],
      loading: false,
    };

    this.clickHere = this.clickHere.bind(this);
    this.setFormValidity = this.setFormValidity.bind(this);
    this.componentLoaded = this.componentLoaded.bind(this);
  }

  clickHere() {
    if (this.state.errorElements.length === 0) {
      this.setState({ isFormValid: false });
      this.moveToNextElement();
    } else {
      const id = this.state.errorElements[0];
      this.moveToElement(id);
    }
  }

  moveToNextElement = () => {
    this.setState({ loading: true, isFormValid: false }, () => {
      this.props.setElementsLoad(this.state.elementsLoaded);
      this.props.selectStepState("section_" + (this.state.elementsLoaded + 1));
      this.setState(
        { elementsLoaded: this.state.elementsLoaded + 1 },
        this.moveToElement("section_" + (this.state.elementsLoaded + 1))
      );
    });
  };

  moveToElement = id => {
    setTimeout(() => {
      try {
        scrollTo("#" + id);
        this.props.selectStepState(id);
      } catch (e) {
        this.moveToNextElement();
      }
    }, 200);
  };

  setFormValidity(error, id, goToNextStep) {
    const isError = error !== null;

    let errorElements = this.state.errorElements;
    if (isError) {
      errorElements.push(id);
    } else {
      _.remove(errorElements, el => el === id);
    }

    if (errorElements.length === 0 && goToNextStep) {
      this.moveToNextElement();
    }

    this.setState({
      isFormValid: !isError && this.state.errorElements.length === 0,
      errorElements,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loadedFromToken) {
      const numberOfElementsLoaded =
        MATERIAL_STEPS_NUMBER * props.lead.cart.length +
        TRANSPORT_STEPS_NUMBER +
        COMPANY_INFO_STEPS_NUMBER -
        1;
      return { elementsLoaded: numberOfElementsLoaded };
    }
    return null;
  }

  updateElementsLoaded = id => {
    const elementsLoaded =
      (this.props.lead.cart.length - 1) * MATERIAL_STEPS_NUMBER;
    // Remove all error elements because this collection could have errors from cart item steps
    // and it could cause some errors
    this.setState({ elementsLoaded, errorElements: [] });
  };

  selectStep = id => {
    this.props.selectStepState(id);
    this.moveToElement(id);
  };

  componentLoaded() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <div className={styles.materialInformationWrapper}>
          {this.props.lead.cart.map((cart, i) => {
            // Return the element. Also pass key
            return (
              <MaterialInformation
                elementsLoaded={this.state.elementsLoaded}
                setFormValidity={this.setFormValidity}
                cartIndex={i}
                key={i}
                defaultRegularly={this.props.defaultRegularly}
                updateElementsLoaded={this.updateElementsLoaded}
                goToNextStep={this.clickHere}
                selectStep={this.selectStep}
                componentLoaded={this.componentLoaded}
              />
            );
          })}

          <TransportInformation
            elementsLoaded={this.state.elementsLoaded}
            setFormValidity={this.setFormValidity}
            selectStep={this.selectStep}
            componentLoaded={this.componentLoaded}
          />
          <CompanyInformation
            elementsLoaded={this.state.elementsLoaded}
            setFormValidity={this.setFormValidity}
            selectStep={this.selectStep}
            componentLoaded={this.componentLoaded}
            goToNextStep={this.clickHere}
          />
          <ClickHere
            onClick={this.clickHere}
            isFormValid={this.state.isFormValid}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    loadedFromToken: leadForm.loadedFromToken,
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(mapStateToProps, actions)(FormContainer);
