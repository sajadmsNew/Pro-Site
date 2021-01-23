import React from "react";
import styles from "./selectsearch.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import Select from "react-dropdown-select";
import _ from "lodash";
import { setLeadField, getLeadField } from "../../../../utils/utils";

class SelectSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      error: null,
    };
  }
  componentDidMount() {
    if (this.props.required) {
      let values = this.getValue();

      if (
        values.length &&
        values[this.props.cartIndex] &&
        values[this.props.cartIndex].label
      ) {
        this.callback(null);
      } else {
        this.callback(false);
      }
    } else {
    }
  }

  callback = error => {
    if (
      "callBackValidation" in this.props &&
      typeof this.props.callBackValidation === "function"
    ) {
      this.props.callBackValidation({ id: this.props.id, error: error });
    }
  };

  onChange = values => {
    this.setState({ values });
    if (values.length > 0) {
      let lead = this.props.lead;
      const value = generateValueString(values);
      setLeadField(this.props, value);
    }

    let error = null;
    if (values.length === 0) {
      error = "Enter the material to proceed";
    }

    this.setState({ error: error });

    this.callback(error);
  };

  style = () => {
    return {
      color: "#2D4C72",
      border: "2px solid #e5eef9",
      minHeight: "50px",
      backgroundColor: "white",
      fontWeight: "normal",
      lineHeight: "28px",
      paddingLeft: "15px",
      paddingRight: "15px",
      width: "auto",
      "::placeholder": {
        color: "red",
      },
    };
  };

  getValue = () => {
    if (this.props.field) {
      let id = getLeadField(this.props);
      if (id && this.props.options) {
        const val = _.find(this.props.options, o => o.materialId == id);
        if (val) {
          return [val];
        }
      }
    }
    return [];
  };

  render() {
    const { t } = this.props;

    const searchable =
      this.props.searchable &&
      this.state &&
      this.state.values &&
      this.state.values.length === 0;

    let selectClasses = [styles.selectDropdown];

    if (this.state.values && this.state.values.length) {
      selectClasses.push(styles.selectDropdownContent);

      if (this.state.values[0].label.length > 35) {
        selectClasses.push(styles.longOptionSelected);
      }
    }

    let labelClass = styles.label;
    if (this.props.isSelectedStep) {
      labelClass = styles.label + " " + styles.active;
    }

    return (
      <div>
        <label className={labelClass}>{t(this.props.label)}</label>
        <Select
          options={this.props.options}
          searchable={searchable}
          clearable={this.props.clearable}
          onChange={value => this.onChange(value)}
          placeholder={this.props.placeholder}
          style={this.style()}
          values={this.getValue()}
          className={selectClasses.join(" ")}
          searchBy={"label"}
        />
        <span className={styles.error}> {t(this.state.error)} </span>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

function generateValueString(values) {
  let val = "";
  values.map(value => {
    if ("" !== val) {
      val = val + ",";
    }
    val += value.materialId;
  });
  return val;
}
export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(SelectSearch));
