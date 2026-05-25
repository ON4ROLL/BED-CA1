// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/userInventoryModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ INVENTORY BY USER ID
// ##############################################################
module.exports.getInventoryByUserId = (req, res) =>
{
    const data = {
        user_id: req.params.id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getInventoryByUserId:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "Inventory not found"
            });
        }

        return res.status(200).json(results);
    };

    model.getInventoryByUserId(data, callback);
};

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ INVENTORY ITEM BY USER
// ##############################################################
module.exports.getInventoryItemByUser = (req, res) =>
{
    const data = {
        user_id: req.params.id,
        item_id: req.params.item_id
    };

    const callback = (error, results) =>
    {
        if (error)
        {
            console.error("Error getInventoryItemByUser:", error);
            return res.status(500).json(error);
        }

        if (results.length === 0)
        {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        return res.status(200).json(results[0]);
    };

    model.getInventoryItemByUser(data, callback);
};
