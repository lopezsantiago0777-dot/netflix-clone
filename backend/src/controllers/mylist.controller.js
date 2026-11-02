import User from '../models/User.js';
import Movie from '../models/Movie.js';

export const getMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('myList');
    res.status(200).json(user.myList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToMyList = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { myList: movie._id } },
      { new: true }
    ).populate('myList');

    res.status(200).json(user.myList);
  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const removeFromMyList = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { myList: req.params.movieId } },
      { new: true }
    ).populate('myList');

    res.status(200).json(user.myList);
  } catch (error) {
    const status = error.name === 'CastError' ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};