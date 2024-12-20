import { Router } from "express";
import { emailInUse, getUsernameByFirebaseId, signUp, usernameInUse } from "../controllers/auth-controller.js";
import verifyFirebaseUser from "../utils/middleware/verifyFirebaseUser.js";

const router = Router();

router.post("/sign_up", verifyFirebaseUser, signUp);
router.post("/get_username_by_firebase_id", getUsernameByFirebaseId);

router.post("/email_in_use", emailInUse);
router.get("/username_in_use/:username", usernameInUse);

export default router;
