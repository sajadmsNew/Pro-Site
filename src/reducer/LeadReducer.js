import {
  LOADED_LEAD,
  LOADED_INITIAL_INFO,
  SET_MAGIC_LINK,
  UPDATE_CURRENT_LEAD,
  ADD_CART_ITEM,
  UPDATED_LEAD,
  RELOAD_LEAD_FILES,
  SEND_CONFIRMATION_FINISHED,
  SHOW_CONFIRMATION_SCREEN,
  SHOW_HIDE_FILLED,
  UPDATE_LEAD_ID,
  REDIRECT_TO_WEBSHOP,
  SELECT_STEP,
  GOOGLE_ADDRESS,
  IS_VALID_VAT,
  VALIDATING_VAT,
} from "../action/types";

import _ from "lodash";

const DEFAULT_CART_ITEM = {
  isRepeating: null,
  availableFromDate: null,
  pickupDeadlineDate: null,
  materialImages: [],
  materialDocuments: [],
  materialCondition: "",
  materialCriteria: "",
  productCondition: "",
  isTargetPrice: null,
};

const INITIAL_STATE = {
  lead: {
    cart: [{ ...DEFAULT_CART_ITEM }],
    trackingInfo: {},
    urgency: "99",
  },
  magicLinkToken: null,
  initialInfo: {
    productConditions: [],
    productCriterias: [],
    loadingCapabilities: [],
    transports: [],
    companyTypes: [],
  },
  files: [],
  loadedFromToken: false,
  finished: false,
  hideFilled: false,
  redirectToWebshop: false,
  selectedStep: "section_0",
  isValidVat: null,
  isValidatingVat: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADED_LEAD:
      if ("" !== action.payload) {
        return {
          ...state,
          lead: action.payload,
          loadedFromToken: true,
          isValidVat: true,
        };
      }
      return { ...state };
    case LOADED_INITIAL_INFO:
      return { ...state, initialInfo: transformInitialData(action.payload) };
    case SET_MAGIC_LINK:
      return { ...state, magicLinkToken: action.payload };
    case UPDATED_LEAD:
      return { ...state, lead: action.payload };
    case UPDATE_CURRENT_LEAD:
      let newlead = { ...state.lead };
      newlead[action.payload.field] = action.payload.value;
      return { ...state, lead: newlead };
    case UPDATE_LEAD_ID:
      let currentLead = { ...state.lead };
      currentLead.leadId = action.leadId;
      return { ...state, lead: currentLead };
    case ADD_CART_ITEM:
      let newleadCart = { ...state.lead };
      let newItem = { ...DEFAULT_CART_ITEM };
      newItem.materialImages = [];
      newItem.materialDocuments = [];
      newleadCart.cart.push(newItem);
      return { ...state, lead: newleadCart };
    case RELOAD_LEAD_FILES:
      return { ...state, files: action.payload };
    case SEND_CONFIRMATION_FINISHED:
      return { ...state, finished: true };
    case SHOW_CONFIRMATION_SCREEN:
      return { ...state, confirm: true };
    case GOOGLE_ADDRESS:
      return { ...state, addressOptions: action.arrAddress };
    case SHOW_HIDE_FILLED:
      return { ...state, hideFilled: action.payload };
    case REDIRECT_TO_WEBSHOP:
      return {
        ...state,
        redirectToWebshop: true,
      };
    case SELECT_STEP:
      return { ...state, selectedStep: action.payload };
    case VALIDATING_VAT:
      return { ...state, isValidatingVat: true };
    case IS_VALID_VAT:
      return { ...state, isValidVat: action.payload, isValidatingVat: false };
    default:
      return state;
  }
};

// Transfor initial data
function transformInitialData(data) {
  // Products
  let products = [];
  data.products.map(p => {
    let product = {
      label: p.name,
      value: p.value,
      materialId: p.value,
      disabled: p.isCategory,
    };
    products.push(product);
  });
  data.products = products;

  // Transports
  const transportTypesOrder = [
    "ma_pickup_container",
    "ma_pickup_palete",
    "big_bag_2",
    "ma_grabber",
    "ma_local_delivery",
    "I don't know",
  ];
  let transports = [];

  data.transports.map(t => {
    const index = transportTypesOrder.indexOf(t._id);
    if (index !== -1) {
      let transport = { label: t._id, value: t._id, sortIndex: index };
      transports.push(transport);
    }
  });
  data.transports = _.orderBy(transports, ["sortIndex"], ["asc"]);

  // Countries
  let countries = [];
  data.countries.map(c => {
    let country = { label: c.name, value: c.code };
    countries.push(country);
  });
  data.countries = _.orderBy(countries, ["label"], ["asc"]);

  // Storage types
  let storageTypes = [];
  data.storageTypes.map(t => {
    let type = { label: t.name, value: t.value };
    storageTypes.push(type);
  });
  data.storageTypes = storageTypes;

  // Company types
  let companyTypes = [];
  const companyTypesOrder = [
    "industry",
    "company",
    "scrap dealers",
    "private",
    "consumer",
  ];
  data.companyTypes.map(t => {
    let type = {
      label: t.fieldName,
      value: t.fieldName,
      sortIndex: companyTypesOrder.indexOf(t.fieldName),
    };
    companyTypes.push(type);
  });

  // Order should be (industry, company, scrap dealers, private, consumer)
  data.companyTypes = _.orderBy(companyTypes, ["sortIndex"], ["asc"]);

  // Hear about types
  let hearAboutTypes = [];
  data.hearAboutTypes.map(t => {
    let type = {
      label: t.fieldName,
      value: t.fieldName,
      needsDescription: t.needsDescription,
      descriptionText: t.descriptionText,
    };
    hearAboutTypes.push(type);
  });
  data.hearAboutTypes = _.orderBy(hearAboutTypes, ["label"], ["asc"]);

  return data;
}
