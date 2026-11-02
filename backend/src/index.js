import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import passport from './config/passport.js';
import { connectDB } from './config/db.js';
import moviesRoutes from './routes/movies.routes.js';
import categoriesRoutes from './routes/categories.routes.js';
import usersRoutes from './routes/users.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/users', usersRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/categories', categoriesRoutes);

await connectDB();
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));