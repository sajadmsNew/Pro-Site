import React from "react";
import styles from "./input.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { setLeadField, getLeadField } from "../../../../utils/utils";
import { REG_EMAIl } from "../../../constants";
import { withNamespaces } from "react-i18next";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  updateField = event => {
    this.setField(event, false);
  };

  updateFieldBlur = event => {
    this.setField(event, true);
  };

  setField = (event, isBlur) => {
    var self = this;
    if (this.props.toUpperCase) {
      event.currentTarget.value = event.currentTarget.value.toUpperCase();
    }
    const value = event.currentTarget.value;
    if (!self.state.error && self.props.field) {
      setLeadField(self.props, value);
    }
    if (this.props.propagateToParent) {
      this.props.propagateToParent(value);
    }
    self.isValid(event, isBlur);
  };

  isValid = (event, isBlur) => {
    const { t, avoidValidate, customError } = this.props;
    if (avoidValidate) {
      return;
    }

    var error = null;

    // When loaded from magiclink avlue will be null because of the event.target
    const value = event.currentTarget.value || getLeadField(this.props);

    // check if required
    if (this.props.required) {
      if (!value || value.length < 1) {
        error = customError ? customError : "This field is required";
      }
    }

    if (this.props.type === "number") {
      if (isNaN(value)) {
        error = customError ? customError : "Number required";
      }
    }

    if (this.props.type === "email") {
      if (!REG_EMAIl.test(value)) {
        error = customError ? customError : "This email is not valid";
      }
    }

    this.setState({ error: error });

    this.callback(error, isBlur);
  };

  callback = (error, isBlur) => {
    const data = { id: this.props.id, error: error };
    if (isBlur && this.props.onBlur) {
      this.props.onBlur(data);
    } else if (
      "callBackValidation" in this.props &&
      typeof this.props.callBackValidation === "function"
    ) {
      this.props.callBackValidation(data);
    }
  };

  componentWillReceiveProps(nextProps) {
    const fieldValue = getLeadField(nextProps);
    if (fieldValue !== undefined && "" !== fieldValue) {
      this.ownValidate(nextProps);
    }
  }

  /**
   * Validate the input depending on the property value
   */
  ownValidate = props => {
    if (props.required) {
      let value;
      if (
        props.lead.cart &&
        props.lead.cart.length &&
        props.lead.cart[props.cartIndex]
      ) {
        const cartItem = props.lead.cart[props.cartIndex];
        value = cartItem[props.field];
      } else if (props.lead) {
        value = props.lead[props.field];
      }
      const event = {
        currentTarget: {
          value,
        },
      };
      this.isValid(event);
    } else {
      this.callback(null);
    }
  };

  getFieldValue = () => {
    if (this.props.field) {
      if (
        "cartIndex" in this.props &&
        this.props.lead.cart[this.props.cartIndex]
      ) {
        return this.props.lead.cart[this.props.cartIndex][this.props.field];
      }
      return getLeadField(this.props);
    }
    return "";
  };

  shouldComponentUpdate(nextProps, nextState) {
    const nextFieldValue = getLeadField(nextProps);
    const currentFieldValue = getLeadField(this.props);

    if (currentFieldValue !== nextFieldValue) {
      return true;
    }
    if (this.state.error !== nextState.error) {
      return true;
    }
    return false;
  }

  render() {
    const { t } = this.props;

    let labelClass = styles.label;
    if (this.props.isSelectedStep) {
      labelClass = styles.label + " " + styles.active;
    }

    return (
      <div className={styles.inputWrapper}>
        {this.props.label ? (
          <label className={labelClass}>{t(this.props.label)}</label>
        ) : null}
        <input
          type={this.props.type || "text"}
          onBlur={this.updateFieldBlur}
          onKeyUp={this.updateField}
          placeholder={this.props.placeholder ? t(this.props.placeholder) : ""}
          field={this.props.field}
          defaultValue={
            this.props.value ? this.props.value : this.getFieldValue()
          }
        />
        <span className={styles.error}>
          {this.props.error ? t(this.props.error) : t(this.state.error)}
        </span>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Input));
