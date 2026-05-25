// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SELECT BATTLES BY USER ID
// ##############################################################
module.exports.getBattlesByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT 
            b.battle_id,
            b.character_id,
            e.name AS enemy_name,
            b.result,
            b.rewards
        FROM Battle b
        JOIN GameCharacter gc ON b.character_id = gc.character_id
        JOIN Enemy e ON b.enemy_id = e.enemy_id
        WHERE gc.user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
