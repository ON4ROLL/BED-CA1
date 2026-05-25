// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/trainingModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TRAINING BY CHALLENGE ID
// ##############################################################
module.exports.getTrainingByChallengeId = (req, res, next) =>
{
    const data = {
        challenge_id: req.params.challenge_id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getTrainingByChallengeId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No training found for this challenge"
            });
        }

        return res.status(200).json(results);
    };

    model.selectByChallengeId(data, callback);
};
