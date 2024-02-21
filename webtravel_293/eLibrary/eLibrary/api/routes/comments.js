import express  from "express";
import { getComments,addComment,deleteComment,updateComment, getCommentsByTripId} from "../controllers/comments.js";

const router = express.Router()


router.get("/",getComments)
router.delete('/:id/:id',deleteComment)
router.put('/:id',updateComment)
router.post("/:id", addComment);
router.get("/:id", getCommentsByTripId);



export default router