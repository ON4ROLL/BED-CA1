// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SELECT ALL QUESTS
// ##############################################################
module.exports.getAllQuests = (callback) =>
{
    const SQLSTATEMENT = `
        SELECT quest_id, title, description, required_level, reward_points
        FROM Quest;
    `;

    pool.query(SQLSTATEMENT, callback);
};

// ##############################################################
// DEFINE SELECT QUEST BY ID
// ##############################################################
module.exports.getQuestById = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT quest_id, title, description, required_level, reward_points
        FROM Quest
        WHERE quest_id = ?;
    `;

    const VALUES = [data.quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE INSERT QUEST
// ##############################################################
module.exports.insertQuest = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO Quest (title, description, required_level, reward_points)
        VALUES (?, ?, ?, ?);
    `;

    const VALUES = [
        data.title,
        data.description,
        data.required_level,
        data.reward_points
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT QUEST STAGES BY QUEST ID
// ##############################################################
module.exports.getStagesByQuestId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT stage_id, quest_id, stage_order, description
        FROM QuestStage
        WHERE quest_id = ?
        ORDER BY stage_order ASC;
    `;

    const VALUES = [data.quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE INSERT QUEST STAGE
// ##############################################################
module.exports.insertStage = (data, callback) =>
{
    const SQLSTATEMENT = `
        INSERT INTO QuestStage (quest_id, stage_order, description)
        VALUES (?, ?, ?);
    `;

    const VALUES = [
        data.quest_id,
        data.stage_order,
        data.description
    ];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE SELECT AVAILABLE QUESTS BY USER ID
// ##############################################################
module.exports.getAvailableQuestsByUserId = (data, callback) =>
{
    const SQLSTATEMENT = `
        SELECT 
            q.quest_id, 
            q.title, 
            q.description,
            q.required_level, 
            q.reward_points
        FROM Quest q
        JOIN User u ON u.user_id = ?
        WHERE u.points >= q.required_level
        ORDER BY q.required_level ASC;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};
