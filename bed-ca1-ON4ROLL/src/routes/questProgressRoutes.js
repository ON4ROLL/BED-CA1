// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/questProgressController');
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get("/:quest_id", controller.getUserQuestProgress);
router.put("/:id", controller.updateQuestProgress);
router.post("/", controller.createQuestProgress);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;