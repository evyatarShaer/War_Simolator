import express from "express";
import { getUserByName, reduceResourceAmount } from "../controllers/userController";

const router = express.Router();

router.get("/users/:name", getUserByName);
router.put("/users/:id", reduceResourceAmount );

export default router;