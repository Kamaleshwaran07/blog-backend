import express from "express"
import { addPost, deletePost, getPost, getSinglePost, updatePost } from "../Controllers/postcontroller.js"

const router = express.Router()

router.get("/", getPost)
router.get("/:id",getSinglePost)
router.post("/addpost",addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)
// router.get("/")
export default router