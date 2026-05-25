// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();

// ##############################################################
// CREATE ROUTER
// ##############################################################
const usersRoutes = require(`./usersRoutes`)
const challengesRoutes = require(`./challengesRoutes`)
const gameCharacterRoutes = require(`./gameCharacterRoutes.js`)
const questRoutes = require(`./questRoutes.js`)
const questProgressRoutes= require(`./questProgressRoutes.js`)
const trainingRoutes = require(`./trainingRoutes.js`)
const userInventoryRoutes = require(`./userInventoryRoutes.js`)
const storyMemoryRoutes = require(`./storyMemoryRoutes.js`)
const letterRoutes = require(`./letterRoutes.js`)
const battleRoutes = require(`./battleRoutes.js`)
// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.use("/users", usersRoutes);
router.use("/challenges", challengesRoutes);
router.use("/characters", gameCharacterRoutes);
router.use("/quests", questRoutes);
router.use("/progress", questProgressRoutes);
router.use("/training", trainingRoutes);
router.use("/inventory", userInventoryRoutes);
router.use("/story", storyMemoryRoutes);
router.use("/letters", letterRoutes);
router.use("/battles", battleRoutes)

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;