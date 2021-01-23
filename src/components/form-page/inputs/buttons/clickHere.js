import React from "react";
import styles from "./buttons.module.scss";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";

class ClickHere extends React.Component { 
  constructor(props) {
    super(props);
    this.enterFunction = this.enterFunction.bind(this);
    
  } 

  enterFunction(event) {
  
    if (event.keyCode === 13 && this.props.isFormValid && !this.props.loading) {
      this.props.onClick();
     
    }
  }
  componentDidMount() {
    document.addEventListener("keyup", this.enterFunction, false);
  }
  render() {
    const { t } = this.props;

    return this.props.isFormValid && !this.props.loadedFromToken&&!this.props.loading ? (
      <div className={styles.clickHere} onClick={this.props.onClick}>
        <span className={styles.pressHereMessage}>{t("Press enter or")}</span>
        <Button variant="contained" color="primary">
          {t("CLICK HERE")}
        </Button>
      </div>
    ) : null;
  }
}

function mapStateToProps({ leadForm }) {
  return {
    loadedFromToken: leadForm.loadedFromToken,
  };
}

export default connect(mapStateToProps)(withNamespaces()(ClickHere));
