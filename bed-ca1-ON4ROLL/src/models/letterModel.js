// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE INSERT LETTER
// ##############################################################
module.exports.insertLetter = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO Letter (user_id, author_type, content, written_at_level, is_unlocked)
        VALUES (?, ?, ?, ?, ?);
    `;

    const VALUES = [
        data.user_id,
        data.author_type,
        data.content,
        data.written_at_level,
        data.is_unlocked
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT UNLOCKED LETTERS BY USER ID
// ##############################################################
module.exports.getUnlockedLettersByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT letter_id, author_type, content, written_at_level
        FROM Letter
        WHERE user_id = ?
          AND is_unlocked = TRUE;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT ALL LETTERS BY USER ID
// ##############################################################
module.exports.getAllLettersByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT letter_id, author_type, content, written_at_level, is_unlocked
        FROM Letter
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
