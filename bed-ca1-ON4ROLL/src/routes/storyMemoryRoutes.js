// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/storyMemoryController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/:id', controller.getStoryByUserId)
router.get('/locked/:id', controller.getLockedMemoriesByUserId)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;