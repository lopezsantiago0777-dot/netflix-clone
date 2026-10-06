import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'API Netflix funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});