exports.GET_PRIMARY_CONTACTS_QUERY = `select * from Contacts where linkPrecedence = 'primary' and (email = $1 or phoneNumber = $2)`;
exports.GET_PRIMARY_CONTACTS_QUERY_ONLY_EMAIL = `select * from Contacts where linkPrecedence = 'primary' and email = $1`;
exports.GET_PRIMARY_CONTACTS_QUERY_ONLY_PHONENO = `select * from Contacts where linkPrecedence = 'primary' and phoneNumber = $1`;

exports.UPDATE_CONTACTS_TO_SECONDARY = `update Contacts set linkedId = $1, linkPrecedence = 'secondary', updatedAt = now() where id <> $2 and (email = $3 or phoneNumber = $4) returning *`;
exports.UPDATE_CONTACTS_TO_SECONDARY_ONLY_EMAIL = `update Contacts set linkedId = $1, linkPrecedence = 'secondary', updatedAt = now() where id <> $2 and email = $3 returning *`;
exports.UPDATE_CONTACTS_TO_SECONDARY_ONLY_PHONENO = `update Contacts set linkedId = $1, linkPrecedence = 'secondary', updatedAt = now() where id <> $2 and phoneNumber = $3 returning *`;

exports.INSERT_INTO_CONTACTS_QUERY = `insert into Contacts (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) values ($1, $2, $3, $4, now(), now()) returning *`;

exports.SECONDARY = 'secondary';
exports.PRIMARY = 'primary';
