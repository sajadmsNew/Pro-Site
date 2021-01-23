import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import styles from "./selectsearch.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../../action";
import { withNamespaces } from "react-i18next";

import { setLeadField } from "../../../../utils/utils";
class SelectAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      error: null,
    };
  }

  style = () => {
    return {
      color: "#2D4C72",
      border: "2px solid #e5eef9",
      height: "50px",
      backgroundColor: "white",
      fontWeight: "normal",

      lineHeight: "28px",
      paddingLeft: "25px",
      paddingRight: "25px",
      width: "auto",
      "::placeholder": {
        color: "red",
      },
    };
  };
  handleChange = address => {
    this.setState({ address });
  };

  callback = error => {
    if (
      "callBackValidation" in this.props &&
      typeof this.props.callBackValidation === "function"
    ) {
      this.props.callBackValidation(error);
    }
  };

  handleSelect = address => {
    var tmp = { ...this.props };

    if (address.match(".*\\d.*")) {
      geocodeByAddress(address)
        .then(results => {
          let objAddress = results[0];
          this.setState({ address: objAddress.formatted_address });

          let label = address;
          let fullAddress = objAddress.formatted_address;
          let streetAddressNo = null;
          let country = null;
          let shortCountry = null;
          let streetAddress = null;
          let zip = null;
          let city = null;
          let locality = null;
          let subLocality = null;
          let administrativeArea2 = null;

          objAddress.address_components.forEach(val => {
            if (val.types.includes("route")) {
              streetAddress = val.long_name;
            }
            if (val.types.includes("street_number")) {
              streetAddressNo = val.long_name;
            }
            if (val.types.includes("administrative_area_level_2")) {
              administrativeArea2 = val.long_name;
            }
            if (val.types.includes("locality")) {
              locality = val.long_name;
            }
            if (val.types.includes("sublocality")) {
              subLocality = val.long_name;
            }
            if (val.types.includes("country")) {
              country = val.long_name;
              shortCountry = val.short_name;
            }
            if (val.types.includes("postal_code")) {
              zip = val.long_name;
            }
          });

          // City is not very good explained in API description. Because of this we need to do this
          // kind of transformation
          city = locality
            ? locality
            : subLocality
            ? subLocality
            : administrativeArea2;

          if (streetAddressNo) {
            streetAddress += " " + streetAddressNo;
          }

          let obj_address = {
            label,
            fullAddress,
            country,
            shortCountry,
            streetAddress,
            zip,
            city,
          };

          if (zip) {
            setLeadField(tmp, obj_address);
          } else {
            throw new Error("Enter the real address to proceed");
          }
        })
        .then(() =>
          this.callback({ id: "transportInformation_address", error: null })
        )
        .catch(error => {
          this.callback({
            id: "transportInformation_address",
            error: error.message,
          });
        });
    } else {
      this.callback({
        id: "transportInformation_address",
        error: "Enter the real address to proceed",
      });
    }
  };

  componentDidMount() {
    if (
      this.props.lead &&
      this.props.lead.pickupAddress &&
      this.props.lead.pickupAddress.label
    ) {
      this.setState({ address: this.props.lead.pickupAddress.label });
    }
  }

  render() {
    if (!window.google) return null;

    const searchOptions = {
      types: ["address"],
    };
    const { t } = this.props;

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: t("Search Places..."),
                className: styles.locationSearchInput,
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={{ index }}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
function mapStateToProps({ leadForm }) {
  return {
    lead: leadForm.lead,
    magicLinkToken: leadForm.magicLinkToken,
    loadedFromToken: leadForm.loadedFromToken,
  };
}

export default connect(
  mapStateToProps,
  actions
)(withNamespaces()(SelectAddress));
