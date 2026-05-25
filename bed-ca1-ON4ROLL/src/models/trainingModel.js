// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SELECT TRAINING SESSION BY CHALLENGE ID
// ##############################################################
module.exports.selectByChallengeId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT
            training_id,
            challenge_id,
            stat_type,
            stat_boost_value
        FROM TrainingSession
        WHERE challenge_id = ?;
    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
