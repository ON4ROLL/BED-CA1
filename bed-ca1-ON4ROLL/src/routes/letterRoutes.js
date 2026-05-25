// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/letterController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', controller.createLetter);
router.get('/:id', controller.getUnlockedLettersByUserId);
router.get('/:id/all', controller.getAllLettersByUserId)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;