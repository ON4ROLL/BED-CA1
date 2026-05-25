// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/questProgressModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ USER QUEST PROGRESS
// ##############################################################
module.exports.getUserQuestProgress = (req, res, next) =>
{
    const data = {
        user_id: req.params.quest_id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getUserQuestProgress:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No quest progress found for this user"
            });
        }

        return res.status(200).json(results);
    };

    model.getProgressByUserId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE QUEST PROGRESS
// ##############################################################
module.exports.updateQuestProgress = (req, res, next) =>
{
    if (
        req.body.quest_id === undefined ||
        req.body.current_stage === undefined
    )
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        user_id: req.params.user_id,
        quest_id: req.body.quest_id,
        current_stage: req.body.current_stage
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error updateQuestProgress:", error);
            return res.status(500).json(error);
        }

        return res.status(200).json({
            user_id: data.user_id,
            quest_id: data.quest_id,
            current_stage: data.current_stage
        });
    };

    model.updateByUserId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE QUEST PROGRESS
// ##############################################################
module.exports.createQuestProgress = (req, res, next) =>
{
    if (
        req.body.user_id === undefined ||
        req.body.quest_id === undefined ||
        req.body.current_stage === undefined ||
        req.body.status === undefined
    )
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        user_id: req.body.user_id,
        quest_id: req.body.quest_id,
        current_stage: req.body.current_stage,
        status: req.body.status
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error createQuestProgress:", error);

            if (error.code === "ER_DUP_ENTRY")
            {
                return res.status(409).json({
                    message: "Quest progress already exists"
                });
            }

            return res.status(500).json(error);
        }

        const progress = results[0];

        return res.status(201).json({
            progress_id: progress.progress_id,
            user_id: progress.user_id,
            quest_id: progress.quest_id,
            current_stage: progress.current_stage,
            status: progress.status,
            character_name: progress.character_name
        });
    };

    model.insertProgress(data, callback);
};
