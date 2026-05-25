# Starter Repository for Assignment

You are required to build your folder structures for your project.

Project Overview

This project is a backend RESTful API for a narrative-driven wellness-gamification game, developed as part of the Backend Development (BED) Continuous Assessment 1.

The game follows a single pre-existing protagonist known as The Forgotten Hero, who has lost their memories after a past tragedy. Players progress through wellness challenges, quests, and story elements while uncovering fragments of the hero’s past.

Important Design Note (Game Narrative Constraint)

This application is intentionally designed around a single, pre-created character.
All gameplay is tied to The Forgotten Hero
The hero is pre-seeded in the database
All progression, inventory, letters, and story memories belong to this character

For testing and usage:
Use user_id = 1
Use the pre-created character associated with this user

Features

Wellness challenges (repeatable, point-based progression)
Quest system with multi-stage story progression
Training sessions derived from wellness challenges
Inventory system (story items, letters)
Story memories that unlock as the hero progresses
Letters written by the hero (you) and received from the princess

Optional battle history viewing (read-only)
This design choice supports the game’s narrative and simplifies backend validation for the scope of CA1.

Project Structure
src/
├── configs/
│ ├──createSchema.js
│ └──initTables.js
|
├── controllers/
│ ├── userController.js
│ ├── challengeController.js
│ ├── inventoryController.js
│ ├── storyController.js
│ ├── letterController.js
│ ├── questController.js
│ └── battleController.js
│
├── models/
│ ├── userModel.js
│ ├── challengeModel.js
│ ├── inventoryModel.js
│ ├── storyModel.js
│ ├── letterModel.js
│ ├── questModel.js
│ └── battleModel.js
│
├── routes/
│ ├── userRoutes.js
│ ├── challengeRoutes.js
│ ├── inventoryRoutes.js
│ ├── storyRoutes.js
│ ├── letterRoutes.js
│ ├── questRoutes.js
│ └── battleRoutes.js
│
├── services/
│ └── db.js
│
├── app.js

Tech Stack
Node.js
Express.js
MySQL
mysql2
dotenv
JavaScript

Setup Instructions
Install Dependencies
npm install

Required packages:
npm install express nodemon mysql2 dotenv

Initialise Tables
Run:
npm run init_tables

This will:
drop existing tables
recreate all tables
reset the database schema

Server runs on:
http://localhost:3000

Key API Endpoints
Users
POST /users
GET /users
GET /users/:user_id
PUT /users/:user_id

Wellness Challenges and Completions
POST /challenges
GET /challenges
PUT /challenges/:id
DELETE /challenges/:id
POST /challenges/:id (completion)
GET /challenges/:id (attemptors)

Character
POST /characters
GET /characters/1

Quests
GET /quests
GET /quests/:id
GET /quests/available/:id
POST /quests
GET /quests/:id/stages
POST /quests/:id/stages

Quest progress
GET /progress/:id
PUT /progress/:id
POST /progress

Training
GET /training/:challenge_id

Inventory
GET /inventory/:user_id
GET /inventory/:user_id/:item_id

Story / Memories
GET /story/:user_id
GET /story/locked/:user_id

Letters
POST /letters
GET /letters/:user_id
GET /letters/:user_id/all

Battles (Optional, Read-only)
GET /battles/:user_id
