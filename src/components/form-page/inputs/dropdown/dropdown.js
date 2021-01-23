import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./dropdown.module.scss";
import dropdownArrow from "../../../../images/dropdownArrow.svg";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { setLeadField, getLeadField } from "../../../../utils/utils";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDropdown: false,
    };

    this.openDropdown = this.openDropdown.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  componentDidMount() {
    this.updateLead(this.state.selected);
  }

  openDropdown(event) {
    this.setState({ openDropdown: !this.state.openDropdown });
  }

  selectOption(event) {
    const selected = event.currentTarget.dataset.index;
    this.setState({ selected, label: event.currentTarget.dataset.label });
    if (this.props.dropdownState) {
      this.props.dropdownState(this.state);
    }
    this.openDropdown();
    if (this.props.callBackValidation) {
      this.props.callBackValidation({ id: selected, error: null });
    }
    this.updateLead(event.currentTarget.dataset.value);
    if (this.props.propagateToParent) {
      this.props.propagateToParent(selected);
    }
  }

  static getDerivedStateFromProps(props, state) {
    const selected = getLeadField(props);
    if (selected) {
      let label = "";
      if (props.options && props.options.length > 0) {
        const item = _.find(props.options, o => o.value === selected);
        if (item) {
          label = item.label;
        }
      }
      return { selected, label };
    } else if (props.selectedValue) {
      return { selected: props.selectedValue, label: props.selectedValue };
    }
    return null;
  }

  updateLead = selected => {
    // Update value through the server
    if (this.props.field) {
      const lead = { ...this.props.lead };
      setLeadField(this.props, selected);
    }
  };

  render() {
    const { t } = this.props;
    const label = this.state.label
      ? t(this.state.label)
      : this.props.placeholder
      ? this.props.placeholder
      : "";

    return (
      <div className={styles.dropdownWrapper}>
        <div
          className={styles.dropdownOption}
          onClick={this.openDropdown}
          id="dropdownToggle"
        >
          <span className={styles.selectedOption}> {label} </span>
        </div>

        <img src={dropdownArrow} alt="Dropdown arrow" />
        {this.state.openDropdown
          ? this.props.options.map((val, index) => {
              return (
                <div
                  key={"dropdown_option_" + index}
                  onClick={this.selectOption}
                  data-label={val.label}
                  data-index={index}
                  data-value={val.value}
                  className={`${styles.dropdownOption} ${
                    this.state.selected === val.value ? styles.active : null
                  }`}
                >
                  {t(val.label)}
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Dropdown));
