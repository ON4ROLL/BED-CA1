// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SELECT QUEST PROGRESS BY USER ID
// ##############################################################
module.exports.getProgressByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT
            gc.name AS character_name,
            uqp.quest_id,
            uqp.current_stage,
            uqp.status
        FROM UserQuestProgress uqp
        JOIN GameCharacter gc ON uqp.user_id = gc.user_id
        WHERE uqp.user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE UPDATE QUEST PROGRESS BY USER ID
// ##############################################################
module.exports.updateByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE UserQuestProgress
        SET quest_id = ?, current_stage = ?, status = 'started'
        WHERE user_id = ?;
    `;

    const VALUES = [
        data.quest_id,
        data.current_stage,
        data.user_id
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE INSERT QUEST PROGRESS
// ##############################################################
module.exports.insertProgress = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO UserQuestProgress (user_id, quest_id, current_stage, status)
        VALUES (?, ?, ?, ?);
    `;

    const VALUES = [
        data.user_id,
        data.quest_id,
        data.current_stage,
        data.status
    ];

    pool.query(SQLSTATEMENT, VALUES, (error, results) =>
    {
        if (error) return callback(error);

        const SQLSTATEMENT_SELECT = `
            SELECT 
                uqp.progress_id,
                uqp.user_id,
                uqp.quest_id,
                uqp.current_stage,
                uqp.status,
                gc.name AS character_name
            FROM UserQuestProgress uqp
            JOIN GameCharacter gc ON uqp.user_id = gc.user_id
            WHERE uqp.progress_id = ?;
        `;

        const VALUES_SELECT = [results.insertId];

        pool.query(SQLSTATEMENT_SELECT, VALUES_SELECT, callback);
    });
};
