exports.GET_PRIMARY_CONTACTS_QUERY = `select distinct case when linkPrecedence='primary' then id else linkedid end as id from Contacts where email = $1 or phoneNumber = $2`;
exports.GET_PRIMARY_CONTACTS_QUERY_ONLY_EMAIL = `select distinct case when linkPrecedence='primary' then id else linkedid end as id from Contacts where email = $1`;
exports.GET_PRIMARY_CONTACTS_QUERY_ONLY_PHONENO = `select distinct case when linkPrecedence='primary' then id else linkedid end as id from Contacts where phoneNumber = $1`;

exports.UPDATE_CONTACTS_TO_SECONDARY = `update Contacts set linkedId = $1, linkPrecedence = 'secondary', updatedAt = now() where id = any($2) or linkedId = any($3) returning *`;

exports.INSERT_INTO_CONTACTS_QUERY = `insert into Contacts (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) values ($1, $2, $3, $4, now(), now()) returning *`;

exports.GET_CONTACT_QUERY = `select * from Contacts where id =  $1`;

exports.GET_SECONDARY_CONTACTS_WITH_LINKEDID = `select * from Contacts where linkedId=$1`;

exports.SECONDARY = 'secondary';
exports.PRIMARY = 'primary';
