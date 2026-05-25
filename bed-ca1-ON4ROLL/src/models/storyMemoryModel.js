// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SELECT UNLOCKED MEMORIES BY USER ID
// ##############################################################
module.exports.getUnlockedMemoriesByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT memory_id, memory_type, description, unlocked_at_level
        FROM StoryMemory
        WHERE user_id = ?
          AND unlocked_at_level <= 1;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT LOCKED MEMORIES BY USER ID
// ##############################################################
module.exports.getLockedMemoriesByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT memory_id, memory_type, unlocked_at_level
        FROM StoryMemory
        WHERE user_id = ?
          AND unlocked_at_level > 1;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
