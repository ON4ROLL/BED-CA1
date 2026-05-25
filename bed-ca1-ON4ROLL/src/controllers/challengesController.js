// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/challengesModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE NEW CHALLENGE
// ##############################################################
module.exports.createNewChallenge = (req, res, next) =>
{
    if (
        req.body.description === undefined ||
        req.body.user_id === undefined ||
        req.body.points === undefined
    )
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        description: req.body.description,
        userid: req.body.user_id,
        points: req.body.points
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error createNewChallenge:", error);

            if (error.code === "ER_DUP_ENTRY")
            {
                return res.status(409).json({
                    message: "Duplicate entry"
                });
            }

            return res.status(500).json(error);
        }

        return res.status(201).json({
            challenge_id: results.insertId,
            description: data.description,
            creator_id: data.userid,
            points: data.points
        });
    };

    model.insertSingle(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL CHALLENGES
// ##############################################################
module.exports.readAllChallenges = (req, res, next) =>
{
    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error readAllChallenges:", error);
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    };

    model.selectAll(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE CHALLENGE COMPLETIONS
// ##############################################################
module.exports.deleteChallengeCompletions = (req, res, next) =>
{
    const data = {
        challenge_id: req.params.challenge_id
    };

    const callback = (error) =>
    {
        if (error)
        {
            console.error("Error deleteChallengeCompletions:", error);
            return res.status(500).json(error);
        }

        next();
    };

    model.deleteCompletionsByChallengeId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE CHALLENGE BY ID
// ##############################################################
module.exports.deleteChallengeById = (req, res, next) =>
{
    const data = {
        challenge_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error deleteChallengeById:", error);
            return res.status(500).json(error);
        }

        if (results.affectedRows === 0)
        {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

        return res.status(204).end();
    };

    model.deleteById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE CHALLENGE BY ID
// ##############################################################
module.exports.updateById = (req, res) =>
{
    if (
        req.body.description === undefined ||
        req.body.user_id === undefined ||
        req.body.points === undefined
    )
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        challenge_id: req.params.id,
        description: req.body.description,
        creator_id: req.body.user_id,
        points: req.body.points
    };

    model.getChallengeById(data, (error, results) =>
    {
        if (error)
        {
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

        if (results[0].creator_id !== data.creator_id)
        {
            return res.status(403).json({
                message: "Forbidden: not challenge owner"
            });
        }

        model.updateById(data, (error) =>
        {
            if (error)
            {
                return res.status(500).json(error);
            }

            return res.status(200).json({
                challenge_id: Number(req.params.id),
                description: data.description,
                creator_id: data.creator_id,
                points: data.points
            });
        });
    });
};

// ##############################################################
// DEFINE MIDDLEWARE FOR VALIDATING COMPLETION BODY
// ##############################################################
module.exports.validateBody = (req, res, next) =>
{
    if (req.body.user_id === undefined || req.body.details === undefined)
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    next();
};

// ##############################################################
// DEFINE MIDDLEWARE FOR CHECKING USER EXISTS
// ##############################################################
module.exports.checkUserExists = (req, res, next) =>
{
    const data = {
        user_id: req.body.user_id
    };

    model.getUserById(data, (error, results) =>
    {
        if (error)
        {
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "User not found"
            });
        }

        next();
    });
};

// ##############################################################
// DEFINE MIDDLEWARE FOR CHECKING CHALLENGE EXISTS
// ##############################################################
module.exports.checkChallengeExists = (req, res, next) =>
{
    const data = {
        challenge_id: req.params.id
    };

    model.getChallengeById(data, (error, results) =>
    {
        if (error)
        {
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "Challenge not found"
            });
        }

        req.challengePoints = results[0].points;
        next();
    });
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE CHALLENGE COMPLETION
// ##############################################################
module.exports.createCompletion = (req, res) =>
{
    const data = {
        challenge_id: req.params.id,
        user_id: req.body.user_id,
        details: req.body.details,
        points: req.challengePoints
    };

    model.insertCompletion(data, (error, insertResults) =>
    {
        if (error)
        {
            return res.status(500).json(error);
        }

        model.addPointsToUser(data, (error) =>
        {
            if (error)
            {
                return res.status(500).json(error);
            }

            return res.status(201).json({
                complete_id: insertResults.insertId,
                challenge_id: Number(data.challenge_id),
                user_id: data.user_id,
                details: data.details
            });
        });
    });
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ CHALLENGE ATTEMPTORS
// ##############################################################
module.exports.challengeAttemptors = (req, res, next) =>
{
    const data = {
        challenge_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error challengeAttemptors:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No users have attempted this challenge"
            });
        }

        return res.status(200).json(results);
    };

    model.readChallengeAttemptors(data, callback);
};
