import Movie from "../models/movie.model.js";

export const createMovie = async (req, res) => {
  try {
    const { title, genre, duration, year, synopsis } = req.body;

    if (!title || !genre || duration === undefined || year === undefined) {
      return res.status(400).json({
        message: "Los campos title, genre, duration y year son obligatorios.",
      });
    }

    if (
      typeof duration !== "number" ||
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      return res.status(400).json({
        message: "La duración debe ser un número entero mayor a cero.",
      });
    }
    const currentYear = new Date().getFullYear(); // Esto va a dar 2026
    if (
      typeof year !== "number" ||
      !Number.isInteger(year) ||
      year < 1888 ||
      year > currentYear
    ) {
      return res.status(400).json({
        message: `El año debe ser un número entero entre 1888 y ${currentYear}.`,
      });
    }
    if (synopsis && typeof synopsis !== "string") {
      return res
        .status(400)
        .json({ message: "La sinopsis debe ser una cadena de texto." });
    }
    const existingMovie = await Movie.findOne({ where: { title } });
    if (existingMovie) {
      return res
        .status(400)
        .json({ message: "Ya existe una película registrada con ese título." });
    }
    const newMovie = await Movie.create({
      title,
      genre,
      duration,
      year,
      synopsis,
    });
    return res.status(201).json(newMovie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener las películas",
      error: error.message,
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: "La película con el ID requerido no existe." });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener la película", error: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, duration, year, synopsis } = req.body;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: "La película con el ID requerido no existe." });
    }
    if (!title || !genre || duration === undefined || year === undefined) {
      return res.status(400).json({
        message: "Los campos title, genre, duration y year son obligatorios.",
      });
    }

    if (
      typeof duration !== "number" ||
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      return res.status(400).json({
        message: "La duración debe ser un número entero mayor a cero.",
      });
    }

    const currentYear = new Date().getFullYear();
    if (
      typeof year !== "number" ||
      !Number.isInteger(year) ||
      year < 1888 ||
      year > currentYear
    ) {
      return res.status(400).json({
        message: `El año debe ser un número entero entre 1888 y ${currentYear}.`,
      });
    }

    if (synopsis && typeof synopsis !== "string") {
      return res
        .status(400)
        .json({ message: "La sinopsis debe ser una cadena de texto." });
    }
    const { Op } = await import("sequelize");
    const existingMovie = await Movie.findOne({
      where: {
        title,
        id: { [Op.ne]: id },
      },
    });
    if (existingMovie) {
      return res.status(400).json({
        message: "Ya existe otra película registrada con ese título.",
      });
    }
    await movie.update({ title, genre, duration, year, synopsis });
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la película",
      error: error.message,
    });
  }
};
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: "La película con el ID requerido no existe." });
    }

    await movie.destroy();
    return res
      .status(200)
      .json({ message: "Película eliminada correctamente." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar la película", error: error.message });
  }
};
