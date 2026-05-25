// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT CHARACTER
// ##############################################################
module.exports.insertCharacter = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO GameCharacter (user_id, name)
        VALUES (?, ?);
    `;

    const VALUES = [data.user_id, data.name];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT CHARACTER ID BY USER ID
// ##############################################################
module.exports.getCharacterByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT character_id
        FROM GameCharacter
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT CHARACTER DETAILS BY USER ID
// ##############################################################
module.exports.selectByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT character_id, user_id, name, level, experience
        FROM GameCharacter
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
