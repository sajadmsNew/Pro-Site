import React from "react";
import styles from "./materialInformation.module.scss";
import Calendar from "react-calendar";
import dropdownArrow from "../../../../images/dropdownArrow.svg";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import * as moment from "moment";
import { withNamespaces } from "react-i18next";

class Deadline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      selected: false,
      openCalendar: false,
    };
    this.changeCheckbox = this.changeCheckbox.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }

  componentDidMount() {
    this.props.setFormValidity(null, this.props.id);
    this.props.componentLoaded();
  }

  static getDerivedStateFromProps(props, state) {
    if ("cartIndex" in props && "lead" in props) {
      const date = props.lead.cart[props.cartIndex]["pickupDeadlineDate"];
      if (date) {
        return { date: moment(date).toDate() };
      }
      return null;
    }
    return null;
  }

  onChange = date => {
    this.setState({ date });
    this.setState({ openCalendar: false });
    // Update data
    const lead = { ...this.props.lead };
    if (this.props.lead.cart[this.props.cartIndex]) {
      this.props.lead.cart[this.props.cartIndex]["pickupDeadlineDate"] = date;
    }
    this.props.updateLead(this.props.magicLinkToken, lead);
  };

  changeCheckbox() {
    this.setState({ selected: !this.state.selected });
  }

  toggleCalendar() {
    this.setState({ openCalendar: !this.state.openCalendar });
  }

  render() {
    const { t } = this.props;

    return (
      <div
        className={`${styles.clickHere} ${styles.section}`}
        id={this.props.id}
      >
        <span className={styles.sectionDescription}>
          {" "}
          {t("Do you have a deadline for pickup?")}{" "}
        </span>
        <div className={styles.datePickUp_dropdownWrapper}>
          <div
            className={styles.datePickUp_dropdownOption}
            onClick={this.toggleCalendar}
          >
            <span className={styles.calendarDropdown}>
              {" "}
              {this.state.date
                .toLocaleString("default", { month: "long" })
                .charAt(0)
                .toUpperCase() +
                this.state.date
                  .toLocaleString("default", { month: "long" })
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
            onChange={this.onChange}
            value={this.state.date}
            className={styles.calendar}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return { lead: leadForm.lead, magicLinkToken: leadForm.magicLinkToken };
}

export default connect(mapStateToProps, actions)(withNamespaces()(Deadline));
