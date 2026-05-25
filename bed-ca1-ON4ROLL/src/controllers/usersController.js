// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/usersModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE USER
// ##############################################################
module.exports.createNewUser = (req, res, next) =>
{
    if (req.body.username === undefined)
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        username: req.body.username
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error createNewUser:", error);

            if (error.code === "ER_DUP_ENTRY")
            {
                return res.status(409).json({
                    message: "Username already exists"
                });
            }

            return res.status(500).json(error);
        }

        return res.status(201).json({
            user_id: results.insertId,
            username: req.body.username,
            points: 0
        });
    };

    model.insertSingle(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL USERS
// ##############################################################
module.exports.readAllUsers = (req, res, next) =>
{
    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error readAllUsers:", error);
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    };

    model.selectAll(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ USER BY ID
// ##############################################################
module.exports.readUserById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error readUserById:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json(results[0]);
    };

    model.selectById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE USER BY ID
// ##############################################################
module.exports.updateById = (req, res, next) =>
{
    if (req.body.username === undefined || req.body.points === undefined)
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        username: req.body.username,
        points: req.body.points,
        id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error updateUserById:", error);

            if (error.code === "ER_DUP_ENTRY")
            {
                return res.status(409).json({
                    message: "Username already exists"
                });
            }

            return res.status(500).json(error);
        }

        if (results.affectedRows === 0)
        {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user_id: data.id,
            username: data.username,
            points: data.points
        });
    };

    model.updateById(data, callback);
};
