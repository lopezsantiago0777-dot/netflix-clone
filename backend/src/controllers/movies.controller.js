import Movie from '../models/Movie.js';

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getMovies = async (req, res) => {
  try {
    const { title, category, page, limit } = req.query;
    const filter = {};

    if (title) filter.title = { $regex: escapeRegex(title), $options: 'i' };
    if (category) filter.category = category;

    // Sin page ni limit: devuelve el listado completo (lo usa el Home)
    if (!page && !limit) {
      const movies = await Movie.find(filter);
      return res.status(200).json(movies);
    }

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 50);

    const [movies, total] = await Promise.all([
      Movie.find(filter)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Movie.countDocuments(filter),
    ]);

    res.status(200).json({
      movies,
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('category');
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.status(200).json(movie);
  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    const status = error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.status(200).json(movie);
  } catch (error) {
    const status = error.name === 'CastError' || error.name === 'ValidationError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.status(200).json({ message: 'Película eliminada' });
  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};