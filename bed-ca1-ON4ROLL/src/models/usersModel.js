// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT SINGLE USER
// ##############################################################
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username)
    VALUES (?);
    `;
const VALUES = [data.username];

pool.query(SQLSTATMENT, VALUES, callback);
}
// ##############################################################
// DEFINE SELECT ALL USERS
// ##############################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATEMENT = `
        SELECT *
        FROM User;
    `;

    pool.query(SQLSTATEMENT, callback);
};
// DEFINE SELECT BY ID OPERATIONS FOR USER
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// DEFINE UPDATE OPERATIONS FOR USER
// ##############################################################
module.exports.updateById = (data, callback) =>
{
    const SQLSTATEMENT = `
    UPDATE User 
    SET username = ?, points = ?
    WHERE user_id =?;
    `;
const VALUES = [data.username, data.points, data.id];

pool.query(SQLSTATEMENT, VALUES, callback);
}
