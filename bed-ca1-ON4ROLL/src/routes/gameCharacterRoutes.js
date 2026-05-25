// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/gameCharacterController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', controller.createCharacter);
router.get('/:id', controller.getCharacterByUserId)

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;