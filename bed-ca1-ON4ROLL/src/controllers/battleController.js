// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/battleModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ BATTLES BY USER ID
// ##############################################################
module.exports.getBattlesByUserId = (req, res) =>
{
    const data = {
        user_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getBattlesByUserId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No battles found"
            });
        }

        return res.status(200).json(results);
    };

    model.getBattlesByUserId(data, callback);
};
