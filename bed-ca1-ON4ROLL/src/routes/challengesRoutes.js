// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/challengesController');
// ##############################################################
// CREATE ROUTER
// ##############################################################
router.post('/', controller.createNewChallenge);
router.get('/', controller.readAllChallenges);
//middleware
router.delete('/:id', controller.deleteChallengeCompletions, controller.deleteChallengeById);
router.put('/:id', controller.updateById);

//q9
router.post('/:id', controller.validateBody, controller.checkUserExists, controller.checkChallengeExists, controller.createCompletion);

router.get('/:id', controller.challengeAttemptors)
// ##############################################################
// DEFINE ROUTES
// ##############################################################


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;