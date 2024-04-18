import admin from "../config/admin.config.js";
import { db } from "../index.js";
import dbPromiseQuery from "../utils/dbPromiseQuery.js";

export const signUp = async (req, res, next) => {
  const { username } = req.body;
  const firebase_id = req.user.uid;
  // console.log(req.user)
  try {
    await dbPromiseQuery("START TRANSACTION");
    await dbPromiseQuery("INSERT INTO users (firebase_id, username) VALUES (?, ?)", [firebase_id, username]);

    console.log("Database User Created In Transaction.");

    await admin.auth().setCustomUserClaims(firebase_id, { accessGranted: true });
    console.log("Custom Claims Set.");

    await dbPromiseQuery("COMMIT");
    console.log("Transaction Committed.");

    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    console.log(err);
    await dbPromiseQuery("ROLLBACK");
    console.log("Transaction Rolled Back.");

    if (err.code === "ER_DUP_ENTRY") {
      return res.status(200).json({ success: false, message: "Username already set" });
    }

    return next(err);
  }
};

export const getUsernameByFirebaseId = async (req, res, next) => {
  const { firebase_id } = req.body;
  try {
    const query = await dbPromiseQuery("SELECT username FROM users WHERE firebase_id = ?", [firebase_id]);

    if (query.length > 0) {
      res.status(200).json({ username: query[0].username });
    } else {
      res.status(200).json({ success: false, username: null });
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const emailInUse = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    res.status(200).json({ result: true });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return res.status(200).json({ result: false, message: "User not found" });
    } else {
      console.log(err);
      return next(err);
    }
  }
};

export const usernameInUse = async (req, res, next) => {
  const { username } = req.params;
  try {
    const query = await dbPromiseQuery("SELECT * FROM users WHERE username = ?", [username]);
    if (query.length > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false, message: "Username not found" });
    }
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
