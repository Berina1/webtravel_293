import express  from "express";
import { deleteUser, getUser, updateUser, updateUserPassword, updateUserPhoto, getUsers } from "../controllers/user.js";

const router = express.Router()

router.get("/:id",getUser)
router.get("/", getUsers);
router.delete("/:id",deleteUser)
router.post("/:id",updateUser);
router.put("/password-change/:id",updateUserPassword);
router.put("/user-image-upload/:id", updateUserPhoto)

export default router 