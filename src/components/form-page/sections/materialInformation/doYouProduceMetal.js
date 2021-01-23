import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Radio from "../../inputs/checkbox/radio";
import Dropdown from "../../inputs/dropdown/dropdown";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

class DoYouProduceMetal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      error: null,
      selectedIndex: null,
    };
    this.setSelected = this.setSelected.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setDropdownSelected = this.setDropdownSelected.bind(this);
  }

  componentDidMount() {
    this.isValid();
    this.props.componentLoaded();
  }

  async setSelected(value) {
    await this.setState({ selected: value });
    this.isValid();
    if (!value) {
      this.props.goToNextStep();
    }
  }

  async setDropdownSelected({ id }) {
    await this.setState({ selectedIndex: id });
    this.isValid();
    if (id !== null) {
      this.props.goToNextStep();
    }
  }

  isValid() {
    const { selected, selectedIndex } = this.state;
    // There is no button option selected or true is selected but no monthly option selected then is incorrect
    if (selected == null || (selected && selectedIndex == null)) {
      this.props.setFormValidity(false, this.props.id);
    } else {
      this.props.setFormValidity(null, this.props.id, selected);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if ("cartIndex" in props) {
      const selected = props.lead.cart[props.cartIndex]["isRepeating"];
      if (selected) {
        const selectedIndex =
          props.lead.cart[props.cartIndex]["repeatingCicle"];
        return { selected, selectedIndex };
      }
      return { selected };
    }
    return null;
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  render() {
    const { t, initialInfo } = this.props;
    let containerClass = "";
    if (this.isSelectedStep(this.props.id)) {
      containerClass = " active";
    }

    return (
      <div
        className={`${styles.clickHere} ${styles.section}` + containerClass}
        id={this.props.id}
        onClick={() => this.props.selectStep(this.props.id)}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <span className={styles.sectionDescription}>
              {t("Do you produce scrap metal on a regular basis?")}
            </span>
          </Grid>
          <Grid item xs={12}>
            <Radio
              selected={this.state.selected}
              setSelected={this.setSelected}
              field="isRepeating"
              cartIndex={this.props.cartIndex}
              defaultValue={this.props.defaultRegularly}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={styles.drowdownWrapper}>
              {this.state.selected ? (
                <div className={styles.animatedContainer}>
                  <span className={styles.sectionDescription}>
                    {t("How often?")}{" "}
                  </span>
                  <Dropdown
                    selectedIndex={this.state.selectedIndex}
                    options={initialInfo.materialFrequencies}
                    field="repeatingCicle"
                    cartIndex={this.props.cartIndex}
                    callBackValidation={this.setDropdownSelected}
                  />
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    initialInfo: leadForm.initialInfo,
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(DoYouProduceMetal));
