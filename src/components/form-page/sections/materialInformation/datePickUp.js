import React from "react";
import styles from "./materialInformation.module.scss";
import Checkbox from "../../inputs/checkbox/checkbox";
import Calendar from "react-calendar";
import dropdownArrow from "../../../../images/dropdownArrow.svg";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { setLeadField } from "../../../../utils/utils";
import * as moment from "moment";
import Deadline from "./deadline";
import { withNamespaces } from "react-i18next";

class DatePickUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      openCalendar: false,
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.changeCheckbox = this.changeCheckbox.bind(this);
  }

  onChange = date => {
    this.setState({ date });
    this.setState({ openCalendar: false });
    this.updateDate(date);
  };

  componentDidMount() {
    this.props.setFormValidity(null, this.props.id);  
    this.props.componentLoaded();
  }

  static getDerivedStateFromProps(props, state) {
    if ("field" in props && "cartIndex" in props && "lead" in props) {
      const date = props.lead.cart[props.cartIndex][props.field];
      if (date) {
        return { date: moment(date).toDate() };
      }
      return null;
    }
    return null;
  }

  changeCheckbox(event) {
    const selected = event.currentTarget.checked;
    let newValue = null;
    if (!selected) {
      newValue = new Date();
    }
    // Update lead
    const lead = { ...this.props.lead };
    if (this.props.lead.cart[this.props.cartIndex]) {
      this.props.lead.cart[this.props.cartIndex][
        "pickupDeadlineDate"
      ] = newValue;
    }
    this.props.updateLead(this.props.magicLinkToken, lead);
  }

  toggleCalendar() {
    this.setState({ openCalendar: !this.state.openCalendar });
  }

  updateDate = value => {
    // Update data
    if (this.props.field) {
      const lead = { ...this.props.lead };
      setLeadField(this.props, value);
    }
  };

  isCheckboxChecked = () => {
    if (
      "field" in this.props &&
      "cartIndex" in this.props &&
      "lead" in this.props
    ) {
      return (
        this.props.lead.cart[this.props.cartIndex]["pickupDeadlineDate"] ===
        null
      );
    }
    return true;
  };

  render() {
    const { t } = this.props;
    const userLang = navigator.language || navigator.userLanguage;

    return (
      <div
        className={`${styles.clickHere} ${styles.section}`}
        id={this.props.id}
      >
        <span className={styles.sectionDescription}>
          {t("When will we be able to pick up the material?")}{" "}
        </span>
        <div className={styles.datePickUp_dropdownWrapper}>
          <div
            className={styles.datePickUp_dropdownOption}
            onClick={this.toggleCalendar}
          >
            <span className={styles.calendarDropdown}>
              {" "}
              {this.state.date
                .toLocaleString(userLang.includes("en_") ? userLang : "de-at", {
                  month: "long",
                })
                .charAt(0)
                .toUpperCase() +
                this.state.date
                  .toLocaleString(
                    userLang.includes("en_") ? userLang : "de-at",
                    { month: "long" }
                  )
                  .slice(1) +
                " " +
                this.state.date.getDate() +
                " " +
                this.state.date.getFullYear() +
                " "}
            </span>
          </div>
          <img src={dropdownArrow} alt="Dropdown arrow" />
        </div>
        {this.state.openCalendar ? (
          <Calendar
            locale={userLang.includes("en_") ? userLang : "de-at"}
            onChange={this.onChange}
            value={this.state.date}
            className={styles.calendar}
          />
        ) : null}
        <Checkbox
          isSelected={this.isCheckboxChecked()}
          label={t(
            "Is the availability date / range same as deadline for pickup?"
          )}
          changeCheckbox={this.changeCheckbox}
        />
        {!this.isCheckboxChecked() ? (
          <Deadline
            cartIndex={this.props.cartIndex}
            setFormValidity={this.props.setFormValidity}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(DatePickUp));
