import passport from '../config/passport.js';

export const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(401).json({ message: 'No autorizado' });
    req.user = user;
    next();
  })(req, res, next);
};