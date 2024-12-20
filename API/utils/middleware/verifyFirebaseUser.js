import admin from "../../config/admin.config.js";
import errorHandler from "../errorHandler.js";

const verifyFirebaseUser = async (req, res, next) => {
  const idToken = req.header("Authorization").split("Bearer ")[1];
  if (!idToken) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;

    return next();
  } catch (err) {
    console.log(err);
    return next(errorHandler(401, "Unauthorized"));
  }
};

export default verifyFirebaseUser;
