import React, { useCallback } from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Info from "../../inputs/info/info";
import Upload from "../../upload/upload";
import Radio from "../../inputs/checkbox/radio";
import * as actions from "../../../../action";
import { connect } from "react-redux";

class UpdateImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, firstShow: true };
  }

  componentDidMount() {
    this.props.setFormValidity(false, this.props.id);

    this.props.componentLoaded();
  }

  setSelected = value => {
    this.setState({ selected: value, firstShow: false });
    this.props.setFormValidity(null, this.props.id);
    if (!value) {
      this.props.goToNextStep();
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.lead && props.lead.cart && !state.selected) {
      return {
        selected:
          props.lead.cart[props.cartIndex].materialImages.length > 0
            ? true
            : state.firstShow && !props.loadedFromToken
            ? null
            : false,
      };
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
            "Images would help us in classifying the quality and ultimately it would help us get you a better price – can you upload a few images of your material"
          )}
          ?
          <Info
            message={t(
              "Product images - please use images with good light so that the material is clearly visible, do not use stock imagery as it might lead to problems further down the road"
            )}
          />
        </span>
        <Radio selected={this.state.selected} setSelected={this.setSelected} />
        {!this.state.selected ? null : (
          <div className={styles.animatedContainer}>
            <Upload
              type={t("images")}
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
    loadedFromToken: leadForm.loadedFromToken,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(UpdateImages));
