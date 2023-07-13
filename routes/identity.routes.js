const express = require('express');
const router = express.Router();
const { identityController } = require('../controllers/identity.controller');

router.post('/', identityController);

module.exports = router;
