const {
  GET_PRIMARY_CONTACTS_QUERY,
  GET_PRIMARY_CONTACTS_QUERY_ONLY_EMAIL,
  GET_PRIMARY_CONTACTS_QUERY_ONLY_PHONENO,
  UPDATE_CONTACTS_TO_SECONDARY,
  UPDATE_CONTACTS_TO_SECONDARY_ONLY_EMAIL,
  UPDATE_CONTACTS_TO_SECONDARY_ONLY_PHONENO,
} = require('./../constants/query.constants');

exports.getSelectQuery = (email, phoneNumber) => {
  if (email && phoneNumber) {
    return {
      query: GET_PRIMARY_CONTACTS_QUERY,
      params: [email, phoneNumber],
    };
  }
  if (email) {
    return {
      query: GET_PRIMARY_CONTACTS_QUERY_ONLY_EMAIL,
      params: [email],
    };
  }
  if (phoneNumber) {
    return {
      query: GET_PRIMARY_CONTACTS_QUERY_ONLY_PHONENO,
      params: [phoneNumber],
    };
  }
};

exports.getUpdateQuery = (email, phoneNumber, primaryContactId) => {
  if (email && phoneNumber) {
    return {
      query: UPDATE_CONTACTS_TO_SECONDARY,
      params: [primaryContactId, primaryContactId, email, phoneNumber],
    };
  }
  if (email) {
    return {
      query: UPDATE_CONTACTS_TO_SECONDARY_ONLY_EMAIL,
      params: [primaryContactId, primaryContactId, email],
    };
  }
  if (phoneNumber) {
    return {
      query: UPDATE_CONTACTS_TO_SECONDARY_ONLY_PHONENO,
      params: [primaryContactId, primaryContactId, phoneNumber],
    };
  }
};
