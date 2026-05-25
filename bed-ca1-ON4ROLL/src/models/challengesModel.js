// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT SINGLE CHALLENGE
// ##############################################################
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO WellnessChallenge (description, creator_id, points)
        VALUES (?, ?, ?);
    `;

    const VALUES = [
        data.description,
        data.userid,
        data.points
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT ALL CHALLENGES
// ##############################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
        SELECT *
        FROM WellnessChallenge;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// DEFINE DELETE COMPLETIONS BY CHALLENGE ID
// ##############################################################
module.exports.deleteCompletionsByChallengeId = (data, callback) =>
{
    const SQLSTATEMENT = `
        DELETE FROM UserCompletion
        WHERE challenge_id = ?;
    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE DELETE CHALLENGE BY ID
// ##############################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATEMENT = `
        DELETE FROM WellnessChallenge
        WHERE challenge_id = ?;
    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE UPDATE CHALLENGE BY ID
// ##############################################################
module.exports.updateById = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE WellnessChallenge
        SET description = ?, points = ?
        WHERE challenge_id = ?;
    `;

    const VALUES = [
        data.description,
        data.points,
        data.challenge_id
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT USER BY ID
// ##############################################################
module.exports.getUserById = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT user_id
        FROM User
        WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT CHALLENGE BY ID
// ##############################################################
module.exports.getChallengeById = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT challenge_id, creator_id, points
        FROM WellnessChallenge
        WHERE challenge_id = ?;
    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE INSERT COMPLETION
// ##############################################################
module.exports.insertCompletion = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO UserCompletion (challenge_id, user_id, details)
        VALUES (?, ?, ?);
    `;

    const VALUES = [
        data.challenge_id,
        data.user_id,
        data.details
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE ADD POINTS TO USER
// ##############################################################
module.exports.addPointsToUser = (data, callback) =>
{
    const SQLSTATEMENT = `
        UPDATE User
        SET points = points + ?
        WHERE user_id = ?;
    `;

    const VALUES = [
        data.points,
        data.user_id
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE READ CHALLENGE ATTEMPTORS
// ##############################################################
module.exports.readChallengeAttemptors = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT user_id, details
        FROM UserCompletion
        WHERE challenge_id = ?;
    `;

    const VALUES = [data.challenge_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
