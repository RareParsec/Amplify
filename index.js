import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";

import authRouter from "./routes/auth-router.js";
import admin from "./config/admin.config.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

export const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || err.code || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
});

app.listen(5000, () => {
  console.log("Server on port 5000");
});

// const deleteAllUsers = async (nextPageToken) => {
//   // List batch of users, 1000 at a time.
//   const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);

//   // Delete each user.
//   const deletionPromises = listUsersResult.users.map((user) => {
//     console.log(`Deleting user with UID: ${user.uid}`);
//     return admin.auth().deleteUser(user.uid);
//   });
//   await Promise.all(deletionPromises);

//   if (listUsersResult.pageToken) {
//     // If there are more users, delete them.
//     await deleteAllUsers(listUsersResult.pageToken);
//   }
// };

// deleteAllUsers().catch(console.error);
