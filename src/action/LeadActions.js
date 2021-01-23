import axios from "axios";
import {
  LOADED_LEAD,
  UPDATED_LEAD,
  LOADED_INITIAL_INFO,
  SET_MAGIC_LINK,
  UPDATE_CURRENT_LEAD,
  ADD_CART_ITEM,
  RELOAD_LEAD_FILES,
  SHOW_CONFIRMATION_SCREEN,
  SEND_CONFIRMATION_FINISHED,
  SHOW_HIDE_FILLED,
  UPDATE_LEAD_ID,
  REDIRECT_TO_WEBSHOP,
  GOOGLE_ADDRESS,
  SELECT_STEP,
  IS_VALID_VAT,
  VALIDATING_VAT,
} from "./types";

const SERVER_URL = process.env.GATSBY_API_URL || "http://localhost:3000";

export const loadLead = magicLink => {
  const url = SERVER_URL + "/api/v1/lead/" + magicLink;
  return dispatch => {
    if (magicLink) {
      dispatch({ type: SET_MAGIC_LINK, payload: magicLink });
      axios
        .get(url)
        .then(data => dispatch({ type: LOADED_LEAD, payload: data.data }))
        .catch(err => console.log(err));
    }
  };
};

export const setMagicLink = magicLink => {
  return dispatch => {
    if (magicLink) {
      dispatch({ type: SET_MAGIC_LINK, payload: magicLink });
    }
  };
};

export const updateLead = (magicLink, lead) => {
  const url = SERVER_URL + "/api/v1/lead/update";
  let update = {};

  return dispatch => {
    if (magicLink) {
      axios
        .post(url, { magicLink, lead })
        .then(data => {
          dispatch({ type: UPDATED_LEAD, payload: lead });
          if (data && data.data && data.data.files) {
            dispatch({ type: RELOAD_LEAD_FILES, payload: data.data.files });
          }
        })
        .catch(err => console.log(err));
    } else {
      dispatch({ type: UPDATED_LEAD, payload: lead });
    }
  };
};

export const loadInitialInfo = () => {
  const url = SERVER_URL + "/api/v1/lead-data";
  return dispatch => {
    axios
      .get(url)
      .then(data => dispatch({ type: LOADED_INITIAL_INFO, payload: data.data }))
      .catch(err => console.log(err));
  };
};

export const loadUrlParameter = (field, value) => {
  return dispatch => {
    dispatch({ type: UPDATE_CURRENT_LEAD, payload: { field, value } });
  };
};

export const addCartItem = () => {
  return dispatch => {
    dispatch({ type: ADD_CART_ITEM });
  };
};

export const uploadFile = (magicLink, file, callback, context, type) => {
  const url = SERVER_URL + "/api/v1/lead/file";
  const form_data = new FormData();

  form_data.append("file", file);
  form_data.append("magicLink", magicLink);
  form_data.append(
    "productId",
    context.props.lead.cart[context.props.lead.cart.length - 1].productID
  );
  form_data.append("type", type);
  return dispatch => {
    axios
      .post(url, form_data)
      .then(data => {
        dispatch({ type: UPDATE_LEAD_ID, leadId: data.data.leadId });
        return data;
      })
      .then(data => {
        callback(context, data.data);
      })
      .catch(err => {
        console.log(err);
        callback(context);
      });
  };
};

export const deleteFile = (magicLink, fileId, callback, context) => {
  const url = SERVER_URL + "/api/v1/lead/file";
  return dispatch => {
    axios
      .delete(url, { data: { magicLink, fileId } })
      .then(data => {
        callback(context, fileId);
      })
      .catch(err => console.log(err));
  };
};

export const googleAddress = value => {
  return dispatch => {
    axios
      .get(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?types=address&language=fr&key=AIzaSyBfDwQK3D11mRl5zact_Hk-QctWpfqEkKk&input=" +
          value,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(response => response.json())
      .then(json => {
        var rst = [];
        if (json.status === "OK") {
          json.results.map(address => {
            var country = null;
            var postal_code = null;
            var route = null;

            address.address_components.forEach(val => {
              if (val.types.includes("postal_code")) {
                postal_code = val.long_name;
              }
              if (val.types.includes("route")) {
                route = val.long_name;
              }
              if (val.types.includes("country")) {
                country = val.long_name;
              }
            });

            rst.push({
              label: address.formatted_address,
              value: address.formatted_address,
              country: country,
              postal_code: postal_code,
              route: route,
            });
          });
        }

        dispatch({
          type: GOOGLE_ADDRESS,
          arrAddress: rst,
        });
      });
  };
};

export const showConfirmationScreen = (magicLink, lead) => {
  return dispatch => {
    dispatch({ type: SHOW_CONFIRMATION_SCREEN });
  };
};

export const sendConfirmation = (magicLink, lead) => {
  const url = SERVER_URL + "/api/v1/lead/confirmation";

  return dispatch => {
    axios
      .post(url, { magicLink, lead })
      .then(data => {
        dispatch({ type: SEND_CONFIRMATION_FINISHED });
      })
      .catch(err => console.log(err));
  };
};

export const showHideFilled = value => {
  return dispatch => {
    dispatch({ type: SHOW_HIDE_FILLED, payload: value });
  };
};

export const selectStepState = value => {
  return dispatch => {
    dispatch({ type: SELECT_STEP, payload: value });
  };
};

export const validateVat = vat => {
  const url = SERVER_URL + "/api/v1/validate-vat/" + vat;
  return dispatch => {
    dispatch({ type: VALIDATING_VAT });
    axios
      .get(url)
      .then(data => dispatch({ type: IS_VALID_VAT, payload: true }))
      .catch(err => dispatch({ type: IS_VALID_VAT, payload: false }));
  };
};

export const shouldRedirectToWebshop = data => {
  return dispatch => {
    const url = SERVER_URL + "/api/v1/redirectToPro/";
    const webshop = { group: null, buyer: null };

    let shouldCheck = true;
    const cart = data.map(p => {
      if (!p.productID || !p.quantity) {
        shouldCheck = false;
      }
      return {
        id: parseInt(p.productID),
        quantity: parseFloat(p.quantity) * 1000,
      };
    });
    if (shouldCheck) {
      axios
        .post(url, { cart, webshop })
        .then(data => {
          const redirect = data.data.redirect;
          if (!redirect) {
            dispatch({ type: REDIRECT_TO_WEBSHOP });
          }
        })
        .catch(err => console.log(err));
    }
  };
};
