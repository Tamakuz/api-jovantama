import express from "express";
import {
  createSkills,
  deleteSkill,
  getLearning,
  getUsingNow,
  moveSkillToUsingNow,
} from "../controllers/skills.controller.js";
import upload from "../middlewares/multer.js";
import {
  createTags,
  deleteTagById,
  getTags,
} from "../controllers/tags.controller.js";
import { createWork, deleteWork, getAllWorks, getWorkById } from "../controllers/work.controller.js";

const Router = express.Router();

Router.post("/skills", upload.single("svg"), createSkills);
Router.delete("/skills/:id", deleteSkill);
Router.put("/move-skill/:idskill", moveSkillToUsingNow);
Router.get("/learning", getLearning);
Router.get("/using-now", getUsingNow);

// tag routing
Router.get("/tags", getTags);
Router.post("/tags", createTags);
Router.delete("/tags/:id", deleteTagById);

// work route
Router.post("/works", upload.single("thumbnail"), createWork);
Router.delete("/works/:workId", deleteWork);
Router.get("/works/:workId", getWorkById);
Router.get("/works", getAllWorks);

export default Router;

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: API untuk mengelola skill
 */

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Membuat skill baru
 *     description: Membuat skill baru dengan file SVG
 *     tags: [Skills]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titleSkill:
 *                 type: string
 *               svg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Skill berhasil dibuat
 *       400:
 *         description: Permintaan tidak valid
 */
