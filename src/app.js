import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import initializeLocalStrategy from './strategies/local.strategy.js';
import initializeJwtStrategy from './strategies/jwt.strategy.js';
import sessionsRouter from './routes/users.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();


app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

initializeLocalStrategy();
initializeJwtStrategy();

app.use('/api/sessions', sessionsRouter);
api.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});