const { pool } = require('./../db');
const AppError = require('./../utils/AppError');
const {
  INSERT_INTO_CONTACTS_QUERY,
  SECONDARY,
  PRIMARY,
} = require('../constants/query.constants');
const { getSelectQuery, getUpdateQuery } = require('../utils/query.builder');

exports.identityController = async (req, res, next) => {
  const { email, phoneNumber } = req.body;

  // if neither email nor phonenumber present throw error
  if (!email && !phoneNumber) {
    return next(
      new AppError(
        400,
        'Either email or phone number must exist on the request body'
      )
    );
  }

  let client = null;

  try {
    const selectQuery = getSelectQuery(email, phoneNumber);

    client = await pool.connect();

    await client.query('BEGIN');

    // Get all primaryContacts
    const primaryContacts = (
      await client.query(selectQuery.query, selectQuery.params)
    ).rows;

    console.log(`Number of Primary Contacts : ${primaryContacts.length}`);
    let primaryRecord;

    const currRecordParams = [
      phoneNumber,
      email,
      primaryContacts.length == 1 ? primaryContacts[0].id : null,
      primaryContacts.length == 1 ? SECONDARY : PRIMARY,
    ];

    // Insert the new Record
    const currentRecord = (
      await client.query(INSERT_INTO_CONTACTS_QUERY, currRecordParams)
    ).rows[0];

    console.log(`Current Record :`, currentRecord);
    if (primaryContacts.length === 1) primaryRecord = primaryContacts[0];
    else primaryRecord = currentRecord;

    // Update all remaining records to Secondary
    const updateQuery = getUpdateQuery(
      primaryRecord.email,
      primaryRecord.phoneNumber,
      primaryRecord.id
    );

    const secondaryContacts = (
      await client.query(updateQuery.query, updateQuery.params)
    ).rows;

    await client.query('COMMIT');

    const emails = [primaryRecord.email];
    const phoneNumbers = [primaryRecord.phonenumber];
    const secondaryContactIds = [];

    secondaryContacts.map((record) => {
      if (record.email) emails.push(record.email);
      if (record.phonenumber) phoneNumbers.push(record.phonenumber);
      secondaryContactIds.push(record.id);
    });

    client.release();

    return res.status(200).json({
      status: 'Success',
      message: 'Database update performed successfully',
      contact: {
        primaryContatctId: primaryRecord.id,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    });
  } catch (error) {
    console.log('Rolling back the changes. Error executing the query : ', e);
    await client.query('ROLLBACK');
  }
  if (client !== null) client.release();
  return res.status(500).json({
    status: 'Failed',
    message: 'Something went wrong. Unable to process the request',
  });
};
