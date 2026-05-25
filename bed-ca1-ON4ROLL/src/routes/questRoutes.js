// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/questController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', controller.getAllQuests);
router.get('/:id', controller.getQuestById);
router.post('/', controller.createQuest);

router.get("/:id/stages", controller.getStagesByQuestId);
router.post("/:id/stages", controller.createStage);
router.get('/', controller.getAvailableQuests);
router.get("/available/:user_id", controller.getAvailableQuests);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;