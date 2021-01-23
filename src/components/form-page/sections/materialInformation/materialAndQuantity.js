import React from "react";
import { withNamespaces } from "react-i18next";
import styles from "./materialInformation.module.scss";
import Input from "../../inputs/input/input";
import * as actions from "../../../../action";
import { connect } from "react-redux";
import SelectSearch from "../../inputs/select/selectsearch";
import Grid from "@material-ui/core/Grid";

class MaterialAndQuantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materialAndQuality_yes: false,
      materialAndQuality_no: false,
      products: [],
    };
  }

  isReadyToContinue = value => {
    this.setState({ [value.id]: value.error === null }, () => {
      if (
        this.state.materialAndQuality_yes &&
        this.state.materialAndQuality_no
      ) {
        this.props.setFormValidity(value.error, this.props.id);
      }
      if (value.error !== null) {
        this.props.setFormValidity(value.error, this.props.id);
      }
    });
  };

  removeMaterial = () => {
    // Updating gloabl elements loaded counter
    this.props.updateElementsLoaded(this.props.id);
    const lead = { ...this.props.lead };
    const deletedElement = _.remove(
      lead.cart,
      (value, index) => index == this.props.cartIndex
    );
    // Remove uploaded images
    if (deletedElement && deletedElement.length > 0) {
      const deletedCartItem = deletedElement[0];
      deletedCartItem.materialImages.map(img => {
        this.props.deleteFile(this.props.magicLinkToken, img);
      });
      deletedCartItem.materialDocuments.map(doc => {
        this.props.deleteFile(this.props.magicLinkToken, doc);
      });
    }
    this.props.updateLead(this.props.magicLinkToken, lead);
  };

  isSelectedStep = id => {
    return this.props.selectedStep === id;
  };

  componentDidMount() {
    this.props.componentLoaded();
  }

  getWeightLabel = () => {
    const { t } = this.props;
    if (
      this.props.lead &&
      this.props.lead.cart &&
      this.props.lead.cart.length > this.props.cartIndex
    ) {
      const quantity = this.props.lead.cart[this.props.cartIndex].quantity;
      if (quantity) {
        return (
          t("You entered") +
          " " +
          this.getWeightFormatted(quantity) +
          " " +
          t("Kilograms")
        );
      }
    }
  };

  getWeightFormatted = quantity => {
    const value = quantity * 1000;
    // leave undefined to use the browser's locale, or use a string like 'en-US' to override it.
    return value.toLocaleString(undefined);
  };

  generateProductsList = () => {
    const { products, lead, cartIndex } = this.props;

    let productList = _.cloneDeep(products);

    // This code it's because Select component uses value property of products as a key
    // And there are products repeated because they could have several parents -> repeated values in the collection
    // Because of that the render method causes an error and the dropdown it's not working properly
    if (productList) {
      let count = 0;
      productList.map(p => {
        p.value = count++;
      });
    }

    return productList;
  };

  // Check if this cart should be redirected to checkout or stay in pro form
  checkRedirection = data => {
    this.props.shouldRedirectToWebshop(this.props.lead.cart);
    this.isReadyToContinue(data);
  };

  render() {
    const { t } = this.props;
    let containerClass = "";
    if (this.isSelectedStep(this.props.id)) {
      containerClass = " active";
    }

    // Only load product list once
    if (
      this.state.products.length === 0 &&
      this.props.products &&
      this.props.products.length > 0
    ) {
      this.setState({ products: this.generateProductsList() });
    }

    const products = this.state.products;

    return (
      <div
        className={[
          styles.root,
          styles.materialAndQuality + containerClass,
        ].join()}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <span className={styles.sectionDescription}>
              {t("Start by select your material and enter quantity")}
            </span>
          </Grid>

          <Grid item xs={12} md={8}>
            <SelectSearch
              required={true}
              id="materialAndQuality_yes"
              label="Choose your material"
              options={products}
              values={[]}
              searchable={true}
              clearable={true}
              callBackValidation={this.checkRedirection}
              field="productID"
              cartIndex={this.props.cartIndex}
              placeholder={t("Start typing here")}
              isSelectedStep={this.isSelectedStep(this.props.id)}
            />
            {this.props.loadedFromToken ? null : this.props.cartIndex ===
              0 ? null : (
              <div
                className={styles.removeOption}
                onClick={this.removeMaterial}
              >
                <span>{t("Remove material")}</span>
              </div>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Input
              id="materialAndQuality_no"
              type="number"
              label="Enter quantity (t)"
              required={true}
              callBackValidation={this.isReadyToContinue}
              placeholder={t("Number")}
              field="quantity"
              cartIndex={this.props.cartIndex}
              className={styles.materialAndQuality_input}
              isSelectedStep={this.isSelectedStep(this.props.id)}
              onBlur={this.checkRedirection}
              customError={t("Enter the quantity to proceed")}
            />
            <label className={styles.materialAndQuality_label}>
              {this.getWeightLabel()}
            </label>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ leadForm }) {
  return {
    magicLinkToken: leadForm.magicLinkToken,
    products: leadForm.initialInfo.products,
    lead: leadForm.lead,
    loadedFromToken: leadForm.loadedFromToken,
    selectedStep: leadForm.selectedStep,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(MaterialAndQuantity));
