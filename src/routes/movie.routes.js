import { Router } from "express";
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controllers.js";

const router = Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);
router.post("/movies", createMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
