// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');
// ##############################################################
// CREATE ROUTER
// ##############################################################
router.post('/', controller.createNewUser);
router.get('/', controller.readAllUsers);
router.get('/:id', controller.readUserById);
router.put('/:id', controller.updateById);
// ##############################################################
// DEFINE ROUTES
// ##############################################################
//Middleware PUT users/:userId/trees/:treeId/water (15 marks) 




//GET /users/trees/tallest-sum-top3 (5 marks) 
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;