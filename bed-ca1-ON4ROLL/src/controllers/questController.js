// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/questModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL QUESTS
// ##############################################################
module.exports.getAllQuests = (req, res) =>
{
    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getAllQuests:", error);
            return res.status(500).json(error);
        }

        return res.status(200).json(results);
    };

    model.getAllQuests(callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ QUEST BY ID
// ##############################################################
module.exports.getQuestById = (req, res) =>
{
    const data = {
        quest_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getQuestById:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "Quest not found"
            });
        }

        return res.status(200).json(results[0]);
    };

    model.getQuestById(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE QUEST
// ##############################################################
module.exports.createQuest = (req, res) =>
{
    if (
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.required_level === undefined ||
        req.body.reward_points === undefined
    )
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        required_level: req.body.required_level,
        reward_points: req.body.reward_points
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error createQuest:", error);
            return res.status(500).json(error);
        }

        return res.status(201).json({
            quest_id: results.insertId,
            title: data.title,
            description: data.description,
            required_level: data.required_level,
            reward_points: data.reward_points
        });
    };

    model.insertQuest(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ QUEST STAGES BY QUEST ID
// ##############################################################
module.exports.getStagesByQuestId = (req, res) =>
{
    const data = {
        quest_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getStagesByQuestId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No stages found for this quest"
            });
        }

        return res.status(200).json(results);
    };

    model.getStagesByQuestId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE QUEST STAGE
// ##############################################################
module.exports.createStage = (req, res) =>
{
    if (
        req.body.stage_order === undefined ||
        req.body.description === undefined
    )
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        quest_id: req.params.id,
        stage_order: req.body.stage_order,
        description: req.body.description
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error createStage:", error);
            return res.status(500).json(error);
        }

        return res.status(201).json({
            stage_id: results.insertId,
            quest_id: Number(data.quest_id),
            stage_order: data.stage_order,
            description: data.description
        });
    };

    model.insertStage(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ AVAILABLE QUESTS BY USER ID
// ##############################################################
module.exports.getAvailableQuests = (req, res) =>
{
    const data = {
        user_id: req.params.user_id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getAvailableQuests:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No available quests"
            });
        }

        return res.status(200).json(results);
    };

    model.getAvailableQuestsByUserId(data, callback);
};
