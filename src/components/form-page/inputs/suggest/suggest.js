import React from "react";
import Tags from "../../inputs/tag/tag";
import inputstyles from "../input/input.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import _ from "lodash";
import { setLeadField } from "../../../../utils/utils";
import styles from "./suggest.module.scss";

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  onChange = event => {
    const value = event.currentTarget.value;
    this.setState({ text: value });
  };

  getTagValues = () => {
    let collection = this.props.initialTags;
    if ("" !== this.state.text) {
      const self = this;
      collection = this.props.allTags;
      collection = _.filter(collection, c => {
        const filterByText = c.fieldName.indexOf(self.state.text) >= 0;
        let selectedItem = false;
        let itemCollection = self.props.lead[self.props.field];
        if ("cartIndex" in this.props) {
          itemCollection =
            self.props.lead.cart[self.props.cartIndex][self.props.field];
        }
        if (itemCollection) {
          selectedItem = itemCollection.indexOf(c.fieldName) >= 0;
        }
        return selectedItem || filterByText;
      });
    }
    return _.map(collection, "fieldName");
  };

  tagClicked = arr => {
    const { t } = this.props;

    let values = [];
    const allValues = this.props.allTags;
    let props = this.props;

    arr.split(",").map(val => {
      if (val.length) {
        const selectedValue = _.find(allValues, v => v.fieldName === val);
        values.push(selectedValue.fieldName);
      }
    });

    const lead = { ...props.lead };

    setLeadField(this.props, values.toString());

    let error = null;
    if (!values.length && this.props.required) {
      error = "This field is required";
    }
    this.callback(error);
  };

  selectedTags = () => {
    if (this.props.lead.cart[this.props.cartIndex]) {
      const itemValues = this.props.lead.cart[this.props.cartIndex][
        this.props.field
      ];
      const allValues = this.props.allTags;
      const items = _.filter(
        allValues,
        t => itemValues.indexOf(t.fieldName) !== -1
      );
      return _.map(items, "fieldName").toString();
    }
  };

  callback = error => {
    if (
      "callBackValidation" in this.props &&
      typeof this.props.callBackValidation === "function"
    ) {
      this.props.callBackValidation({ id: this.props.id, error: error });
    }
  };

  componentDidMount() {
    if (this.props.required) {
      this.callback(false);
    } else {
      this.callback(null);
    }
  }

  render() {
    const { t } = this.props;

    let labelClass = styles.label;
    if (this.props.isSelectedStep) {
      labelClass = styles.label + " " + styles.active;
    }

    return (
      <div>
        <div className={inputstyles.inputWrapper}>
          <label className={labelClass}>{t(this.props.label)}</label>
          <input
            type={"text"}
            onKeyUp={this.onChange}
            placeholder={
              this.props.placeholder ? t(this.props.placeholder) : ""
            }
            field={this.props.field}
            className={styles.input}
          />
          <span className={inputstyles.error}></span>
        </div>
        <Tags
          arrTags={this.getTagValues()}
          selectedTags={this.selectedTags()}
          selectedCallback={this.tagClicked}
        />
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Suggest));
