const mysql = require('mysql');
const dotenv = require("dotenv");

dotenv.config({path: './.env'});

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password
});

// Create Database And Table
connection.connect((error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Connected to the database`);
  
    const databaseName = process.env.DB_Name;
  // Create database query
    connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(`Database '${databaseName}' created or already exists`);
      
      connection.changeUser({ database: databaseName }, (error) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(`Switched to database '${databaseName}'`);
        // Tables Query
        const usersTable = `CREATE TABLE IF NOT EXISTS users (
          userId INT AUTO_INCREMENT PRIMARY KEY,
          firstName NVARCHAR(20) NOT NULL,
          lastName NVARCHAR(20) NOT NULL,
          email VARCHAR(255) NOT NULL unique,
          password NVARCHAR(255) NOT NULL,
          bio NVARCHAR(50),
          photo  LONGBLOB
        )`;

        const podcastsTable = `CREATE TABLE IF NOT EXISTS podcasts (
          podcastId INT AUTO_INCREMENT PRIMARY KEY,
          name NVARCHAR(50) NOT NULL,
          photo LONGBLOB NOT NULL,
          audio LONGBLOB NOT NULL,
          userId INT NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(userId)
        )`;

        const commentsTable = `CREATE TABLE IF NOT EXISTS comments (
          commentId INT AUTO_INCREMENT PRIMARY KEY,
          content NVARCHAR(50) NOT NULL,
          userId INT NOT NULL,
          podcastId INT NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(userId),
          FOREIGN KEY (podcastId) REFERENCES podcasts(podcastId)
        )`;

        const likesTable = `CREATE TABLE IF NOT EXISTS likes (
          likeId INT AUTO_INCREMENT PRIMARY KEY,
          userId INT NOT NULL,
          podcastId INT NOT NULL,
          FOREIGN KEY (userId) REFERENCES users(userId),
          FOREIGN KEY (podcastId) REFERENCES podcasts(podcastId)
        )`;
        // Implement queries
        connection.query(usersTable, (error) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log('Users table created successfully');
        });

        connection.query(podcastsTable, (error) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log('Podcasts table created successfully');
        });

        connection.query(commentsTable, (error) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log('Comments table created successfully');
        });

        connection.query(likesTable, (error) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log('Likes table created successfully');
        });
      });
    });
});

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.DB_Name
});


module.exports = pool;