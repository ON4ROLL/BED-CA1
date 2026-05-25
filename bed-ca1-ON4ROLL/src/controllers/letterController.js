// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/letterModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE LETTER
// ##############################################################
module.exports.createLetter = (req, res) =>
{
    if (
        req.body.user_id === undefined ||
        req.body.author_type === undefined ||
        req.body.content === undefined ||
        req.body.written_at_level === undefined
    )
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        user_id: req.body.user_id,
        author_type: req.body.author_type,
        content: req.body.content,
        written_at_level: req.body.written_at_level,
        is_unlocked: req.body.is_unlocked ?? false
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error createLetter:", error);
            return res.status(500).json(error);
        }

        return res.status(201).json({
            letter_id: results.insertId,
            user_id: data.user_id,
            author_type: data.author_type,
            content: data.content,
            written_at_level: data.written_at_level,
            is_unlocked: data.is_unlocked
        });
    };

    model.insertLetter(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ UNLOCKED LETTERS BY USER ID
// ##############################################################
module.exports.getUnlockedLettersByUserId = (req, res) =>
{
    const data = {
        user_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getUnlockedLettersByUserId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No unlocked letters found"
            });
        }

        return res.status(200).json(results);
    };

    model.getUnlockedLettersByUserId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL LETTERS BY USER ID
// ##############################################################
module.exports.getAllLettersByUserId = (req, res) =>
{
    const data = {
        user_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getAllLettersByUserId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No letters found"
            });
        }

        return res.status(200).json(results);
    };

    model.getAllLettersByUserId(data, callback);
};
