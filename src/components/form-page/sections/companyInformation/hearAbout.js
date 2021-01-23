import React from "react";
import styles from "./companyInformation.module.scss";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import Dropdown from "../../inputs/dropdown/dropdown";
import Input from "../../inputs/input/input";
import _ from "lodash";

class HearAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      extraStep: false,
      extraStepTitle: "",
    };
  }

  onChange = index => {
    const selectedProduct = this.props.hearAboutTypes[index];
    this.setState({
      extraStep: selectedProduct.needsDescription,
      extraStepTitle: selectedProduct.descriptionText,
    });
  };

  componentDidMount() {
    if (this.props.lead && this.props.lead.hearAbout) {
      const option = _.find(
        this.props.hearAboutTypes,
        t => t.label === this.props.lead.hearAbout
      );

      if (option) {
        this.setState({
          extraStep: option.needsDescription,
          extraStepTitle: option.descriptionText,
        });
      }
    }
  }

  render() {
    const { t } = this.props;

    return (
      <div className={""}>
        <span
          className={
            styles.sectionDescription + " " + styles.hearAboutDescription
          }
        >
          {t("Can you tell us how did you hear about us?")}
        </span>
        <Dropdown
          options={this.props.hearAboutTypes}
          field="hearAbout"
          selectedIndex={this.state.selectedIndex}
          propagateToParent={this.onChange}
        />
        {this.state.extraStep ? (
          <>
            <span
              className={
                styles.sectionDescription + " " + styles.hearAboutDescription
              }
            >
              {t(this.state.extraStepTitle)}
            </span>
            <Input
              id="hear_about_text"
              placeholder={t("Enter your text")}
              field="hearAboutDescription"
              type="text"
              required={false}
            />
          </>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
    hearAboutTypes: leadForm.initialInfo.hearAboutTypes,
  };
}

export default connect(mapStateToProps, actions)(withNamespaces()(HearAbout));
