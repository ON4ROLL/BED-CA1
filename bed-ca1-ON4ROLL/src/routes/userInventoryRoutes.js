// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userInventoryController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/:id/:item_id', controller.getInventoryItemByUser);
router.get('/:id', controller.getInventoryByUserId);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;