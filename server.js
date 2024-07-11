import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import './config/db.js';
import route from './routes/index.js';
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors())

app.use('/', route);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));