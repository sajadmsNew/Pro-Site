// Update lead field
export const setLeadField = (props, value) => {
  if (props.field) {
    const lead = { ...props.lead };

    // If there is a cartIndex property then this property is from a cart item
    let obj = getObject(props.field, lead);
    if ("cartIndex" in props) {
      obj = getObject(props.field, lead.cart[props.cartIndex]);
    }

    //Set the field in the object 
    obj.obj[obj.field] = value;

    // Update this value to the server
    props.updateLead(props.magicLinkToken, lead);
  }
};

// Get lead field
export const getLeadField = props => {
  if (props.field) {
    // Get the right object
    let obj = getObject(props.field, props.lead);
    if ("cartIndex" in props) {
      obj = getObject(props.field, props.lead.cart[props.cartIndex]);
    }

    // Return object value
    if (obj.obj) {
      return obj.obj[obj.field];
    }
  }
  return null;
};

// Get the object to set the custom property (eg: "pickupAddress.zip" will return pickupAddress object from initialObject)
function getObject(field, initialObject) {
  const parts = field.split(".");
  let obj = initialObject;
  let i = 0;
  for (; i < parts.length - 1; i++) {
    if (!obj[parts[i]]) {
      obj[parts[i]] = {};
    }
    obj = obj[parts[i]];
  }
  return { obj, field: parts[i] };
}

// Get uploaded file url
export const getFileUrl = file => {
  const fileUrl =
    file.meta.host +
    file._downloadRoute +
    "/" +
    file._collectionName +
    "/" +
    file._id +
    "/original/" +
    file._id +
    file.extensionWithDot;
  return fileUrl
    .replace(/\/\//g, "/")
    .replace("http:/", "http://")
    .replace("https:/", "https://");
};
