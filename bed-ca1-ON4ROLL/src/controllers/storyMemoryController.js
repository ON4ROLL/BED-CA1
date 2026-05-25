// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/storyMemoryModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ UNLOCKED STORY MEMORIES BY USER ID
// ##############################################################
module.exports.getStoryByUserId = (req, res) =>
{
    const data = {
        user_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getStoryByUserId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No story memories found"
            });
        }

        return res.status(200).json(results);
    };

    model.getUnlockedMemoriesByUserId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ LOCKED STORY MEMORIES BY USER ID
// ##############################################################
module.exports.getLockedMemoriesByUserId = (req, res) =>
{
    const data = {
        user_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getLockedMemoriesByUserId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "No locked memories found"
            });
        }

        return res.status(200).json(results);
    };

    model.getLockedMemoriesByUserId(data, callback);
};
