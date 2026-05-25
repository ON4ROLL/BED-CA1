// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/trainingController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get("/:challenge_id", controller.getTrainingByChallengeId)
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;