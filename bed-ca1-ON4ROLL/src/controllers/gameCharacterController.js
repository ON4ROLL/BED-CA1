// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/gameCharacterModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE CHARACTER
// ##############################################################
module.exports.createCharacter = (req, res) =>
{
    if (req.body.user_id === undefined || req.body.name === undefined)
    {
        return res.status(400).json({
            message: "Missing required data"
        });
    }

    const data = {
        user_id: req.body.user_id,
        name: req.body.name
    };

    const insertCallback = (error, results) =>
    {
        if (error)
        {
            console.error("Error createCharacter:", error);
            return res.status(500).json(error);
        }

        return res.status(201).json({
            character_id: results.insertId,
            user_id: data.user_id,
            name: data.name,
            level: 1,
            experience: 0
        });
    };

    const checkCallback = (error, results) =>
    {
        if (error)
        {
            console.error("Error checkCharacter:", error);
            return res.status(500).json(error);
        }

        if (results.length > 0)
        {
            return res.status(409).json({
                message: "User already has a character"
            });
        }

        model.insertCharacter(data, insertCallback);
    };

    model.getCharacterByUserId(data, checkCallback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ CHARACTER BY USER ID
// ##############################################################
module.exports.getCharacterByUserId = (req, res) =>
{
    const data = {
        user_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getCharacterByUserId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "Character not found"
            });
        }

        const character = results[0];

        return res.status(200).json({
            character_id: character.character_id,
            user_id: character.user_id,
            name: character.name,
            level: character.level,
            experience: character.experience
        });
    };

    model.selectByUserId(data, callback);
};
