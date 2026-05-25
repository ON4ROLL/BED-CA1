// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
-- =========================
-- DROP TABLES (child → parent)
-- =========================

DROP TABLE IF EXISTS Letter;
DROP TABLE IF EXISTS StoryMemory;
DROP TABLE IF EXISTS UserInventory;
DROP TABLE IF EXISTS InventoryItem;
DROP TABLE IF EXISTS Battle;
DROP TABLE IF EXISTS Enemy;
DROP TABLE IF EXISTS TrainingSession;
DROP TABLE IF EXISTS UserQuestProgress;
DROP TABLE IF EXISTS QuestStage;
DROP TABLE IF EXISTS Quest;
DROP TABLE IF EXISTS GameCharacter;
DROP TABLE IF EXISTS UserCompletion;
DROP TABLE IF EXISTS WellnessChallenge;
DROP TABLE IF EXISTS User;

-- =========================
-- CORE TABLES
-- =========================

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  points INT DEFAULT 0
);

CREATE TABLE WellnessChallenge (
  challenge_id INT AUTO_INCREMENT PRIMARY KEY,
  creator_id INT NOT NULL,
  description TEXT NOT NULL,
  points INT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES User(user_id)
);

CREATE TABLE UserCompletion (
  completion_id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id INT NOT NULL,
  user_id INT NOT NULL,
  details TEXT,
  FOREIGN KEY (challenge_id) REFERENCES WellnessChallenge(challenge_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- =========================
-- GAME TABLES
-- =========================

CREATE TABLE GameCharacter (
  character_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(255),
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  current_hp INT DEFAULT 100,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Quest (
  quest_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  required_level INT,
  reward_points INT
);

CREATE TABLE QuestStage (
  stage_id INT AUTO_INCREMENT PRIMARY KEY,
  quest_id INT NOT NULL,
  stage_order INT,
  description TEXT,
  FOREIGN KEY (quest_id) REFERENCES Quest(quest_id)
);

CREATE TABLE UserQuestProgress (
  progress_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quest_id INT NOT NULL,
  current_stage INT,
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (quest_id) REFERENCES Quest(quest_id)
);

CREATE TABLE TrainingSession (
  training_id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_id INT NOT NULL,
  stat_type VARCHAR(50),
  stat_boost_value INT,
  FOREIGN KEY (challenge_id) REFERENCES WellnessChallenge(challenge_id)
);

CREATE TABLE Enemy (
  enemy_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  difficulty_level INT,
  hp INT
);

CREATE TABLE Battle (
  battle_id INT AUTO_INCREMENT PRIMARY KEY,
  character_id INT NOT NULL,
  enemy_id INT NOT NULL,
  result VARCHAR(50),
  rewards TEXT,
  FOREIGN KEY (character_id) REFERENCES GameCharacter(character_id),
  FOREIGN KEY (enemy_id) REFERENCES Enemy(enemy_id)
);

CREATE TABLE InventoryItem (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  item_type VARCHAR(50)
);

CREATE TABLE UserInventory (
  inventory_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES User(user_id),
  FOREIGN KEY (item_id) REFERENCES InventoryItem(item_id)
);

CREATE TABLE StoryMemory (
  memory_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  memory_type VARCHAR(50),
  description TEXT,
  unlocked_at_level INT,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Letter (
  letter_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  author_type VARCHAR(50),
  content TEXT,
  written_at_level INT,
  is_unlocked BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

INSERT INTO User (username, points) VALUES
('lunarfox', 25),
('midnightbyte', 40),
('softreset', 15),
('pixelwanderer', 35);

INSERT INTO WellnessChallenge (creator_id, description, points) VALUES
(1, 'Power down early - Sleep before midnight', 10),
(1, 'Leg day IRL - Use stairs instead of lifts', 20),
(2, 'Offline hour - Stay off social media for 60 minutes', 10),
(2, 'Fresh air break - Walk outside for 15 minutes', 10),
(2, 'Human connection - Have a real conversation today', 20),
(3, 'Reset your space - Organise your workspace', 20),
(3, 'Kindness quest -  Help someone without expecting thanks', 20);

INSERT INTO UserCompletion (challenge_id, user_id, details) VALUES
(1, 1, 'Went to bed before 11, felt amazing'),
(2, 2, 'Stairs nearly killed me but worth it'),
(3, 1, 'Read a book instead of scrolling'),
(4, 3, 'Nice walk, cleared my head'),
(5, 1, 'Awkward but wholesome conversation'),
(6, 4, 'Desk finally looks usable'),
(1, 2, 'Best sleep I''ve had all week'),
(4, 4, 'Sunlight hit different today');


INSERT INTO Quest (title, description, required_level, reward_points) VALUES
(
  'The Forgotten Awakening',
  'You awaken in a quiet land, your memories shattered. A name lingers, but no face.',
  0,
  30
),
(
  'Echoes of a Promise',
  'Fragments of a vow surface as you travel familiar paths that feel strangely foreign.',
  50,
  40
),
(
  'Whispers of the Fallen',
  'The truth begins to unravel. Not all journeys end the way we hope.',
  120,
  60
),
(
  'Acceptance of Loss',
  'You finally confront the memory you have been running from.',
  200,
  80
),
(
  'A New Purpose',
  'Though the past cannot be changed, a new path lies ahead.',
  300,
  100
);

INSERT INTO QuestStage (quest_id, stage_order, description) VALUES
-- Quest 1: The Forgotten Awakening
(1, 1, 'You wake up alone with no recollection of how you arrived here.'),
(1, 2, 'You explore the nearby area, feeling an unsettling familiarity.'),
(1, 3, 'A broken sword hints at battles you do not remember.'),

-- Quest 2: Echoes of a Promise
(2, 1, 'Villagers speak of a knight who once passed through.'),
(2, 2, 'You recall fragments of laughter and a gentle voice.'),
(2, 3, 'A promise resurfaces, though its meaning remains unclear.'),

-- Quest 3: Whispers of the Fallen
(3, 1, 'Old ruins reveal traces of a great conflict.'),
(3, 2, 'You uncover records of a battle long past.'),
(3, 3, 'The truth about the princess begins to emerge.'),

-- Quest 4: Acceptance of Loss
(4, 1, 'Memories flood back with painful clarity.'),
(4, 2, 'You revisit the place where everything ended.'),
(4, 3, 'You accept the truth you tried to forget.'),

-- Quest 5: A New Purpose
(5, 1, 'With the past behind you, a new journey begins.'),
(5, 2, 'You redefine what it means to move forward.'),
(5, 3, 'Your story continues, shaped by who you have become.');

INSERT INTO GameCharacter (user_id, name, level, experience, current_hp) VALUES
(
  1,
  'The Forgotten Knight',
  1,
  0,
  100
),
(
  2,
  'Wandering Scholar',
  5,
  120,
  90
),
(
  3,
  'Village Elder',
  10,
  500,
  80
),
(
  4,
  'Silent Guardian',
  8,
  300,
  110
);

INSERT INTO TrainingSession (challenge_id, stat_type, stat_boost_value) VALUES
-- Sleep like a boss
(1, 'stamina', 2),

-- Stairs over elevator
(2, 'strength', 1),

-- Digital detox
(3, 'intelligence', 2),

-- Touch grass IRL
(4, 'agility', 1),

-- Talk to a friend face-to-face
(5, 'charisma', 1),

-- Clean your desk or room
(6, 'strength', 2),

-- Help someone without being asked
(7, 'charisma', 2);

INSERT INTO Enemy (name, difficulty_level, hp) VALUES
('Shadow Beast', 3, 200),
('Wraith of Regret', 6, 350),
('Demon Lord', 10, 1000);


INSERT INTO InventoryItem (name, description, item_type) VALUES
(
  'Wrinkled Letter',
  'A faded letter, creased from being folded too many times.',
  'story'
),
(
  'Old Sword',
  'An old sword that seems like its been heavily used. It feels familiar in your hands.',
  'story'
),
(
  'Royal Emblem',
  'An insignia bearing the crest of a kingdom.',
  'story'
);

INSERT INTO UserInventory (user_id, item_id, quantity) VALUES
(1, 1, 1),
(1,2,1),
(1,3,1);

INSERT INTO Letter (user_id, author_type, content, written_at_level, is_unlocked) VALUES
(
  1,
  'Princess',
  'Letter',
  1,
  TRUE
);

INSERT INTO StoryMemory (user_id, memory_type, description, unlocked_at_level) VALUES

(1, 'lost', 'You wake up alone, your sword chipped and your head pounding.', 1),

(1, 'lost', 'A shadow of a woman smiling at you fades from memory.', 3),

(1, 'truth', 'The princess died long before you began this journey.', 5),

(1, 'truth', 'You already defeated the Demon Lord.', 8);

INSERT INTO Battle (character_id, enemy_id, result, rewards) VALUES
(1, 1, 'victory', 'A vague memory of claws and darkness'),
(1, 2, 'victory', 'Fragments of forgotten strength'),
(1, 3, 'victory', 'The truth you tried to forget');

`;

// ##############################################################
// RUN SQL STATEMENTS
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
