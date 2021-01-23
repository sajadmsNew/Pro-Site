import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Info from "../../inputs/info/info";
import Upload from "../../upload/upload";
import Radio from "../../inputs/checkbox/radio";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import Textarea from "../../inputs/textarea/textarea";

class UploadDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, firstShow: true };
  }

  componentDidMount() {
    this.props.setFormValidity(null, this.props.id);

    this.props.componentLoaded();
  }

  setSelected = value => {
    this.setState({ selected: value, firstShow: false });
    this.props.setFormValidity(null, this.props.id);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.lead && props.lead.cart && !state.selected) {
      const hasDocuments =
        props.lead.cart[props.cartIndex].materialDocuments.length > 0;
      const hasComments = props.lead.cart[props.cartIndex].materialProperties
        ? true
        : false;
      let selected;
      if (hasDocuments) {
        selected = true;
      } else if (hasComments) {
        selected = false;
      } else {
        selected = state.firstShow ? null : false;
      }
      return { selected };
    }
    return null;
  }

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  render() {
    const { t } = this.props;
    let containerClass = "";
    if (this.isSelectedStep(this.props.id)) {
      containerClass = " active";
    }

    return (
      <div
        className={
          `${styles.productConditions} ${styles.section}` + containerClass
        }
        id={this.props.id}
        onClick={() => this.props.selectStep(this.props.id)}
      >
        <span
          className={[styles.sectionDescription, styles.bigMarginBottom].join(
            " "
          )}
        >
          {t(
            "Some products have specific properties, or you might have done a chemical analysis so any accompanying documents might help us get you a better price. Would you like to upload any relevant documents?"
          )}
          <Info
            message={t(
              "Product documents - Have traders give us the list of possible documents"
            )}
          />
        </span>
        <Radio
          selected={this.state.selected}
          setSelected={this.setSelected}
          optionYesLabel={t("Upload documents")}
          optionNoLabel={t("Enter manually")}
        />
        {this.state.selected === null ? null : !this.state.selected ? (
          <div className={styles.animatedContainer}>
            <div className={styles.productPropertiesContainer}>
              <Textarea
                placeholder={t("Type here")}
                field="materialProperties"
                cartIndex={this.props.cartIndex}
              />
            </div>
          </div>
        ) : (
          <div className={styles.animatedContainer}>
            <Upload
              type={t("documents")}
              field={this.props.field}
              cartIndex={this.props.cartIndex}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(UploadDocuments));
