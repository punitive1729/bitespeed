const {
  GET_PRIMARY_CONTACTS_QUERY,
  GET_PRIMARY_CONTACTS_QUERY_ONLY_EMAIL,
  GET_PRIMARY_CONTACTS_QUERY_ONLY_PHONENO,
  UPDATE_CONTACTS_TO_SECONDARY,
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

exports.getUpdateQuery = (listOfIds, primaryContactId) => {
  return {
    query: UPDATE_CONTACTS_TO_SECONDARY,
    params: [primaryContactId, listOfIds, listOfIds],
  };
};
