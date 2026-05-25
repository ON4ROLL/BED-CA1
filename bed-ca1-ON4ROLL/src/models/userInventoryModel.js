// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SELECT INVENTORY BY USER ID
// ##############################################################
module.exports.getInventoryByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT *
        FROM UserInventory
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT INVENTORY ITEM BY USER
// ##############################################################
module.exports.getInventoryItemByUser = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT *
        FROM UserInventory
        WHERE user_id = ? AND item_id = ?;
    `;

    const VALUES = [data.user_id, data.item_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
