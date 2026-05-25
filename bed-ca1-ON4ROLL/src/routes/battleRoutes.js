// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/battleController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/:id', controller.getBattlesByUserId);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;