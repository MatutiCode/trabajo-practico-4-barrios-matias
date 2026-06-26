import Movie from "../models/movie.model.js";

export const createMovie = async (req, res) => {
  try {
    const { title, genre, duration, year, synopsis } = req.body;

    if (!title || !genre || duration === undefined || year === undefined) {
      return res
        .status(400)
        .json({
          message: "Los campos title, genre, duration y year son obligatorios.",
        });
    }

    if (
      typeof duration !== "number" ||
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      return res
        .status(400)
        .json({
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
      return res
        .status(400)
        .json({
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
