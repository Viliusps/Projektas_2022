import express from "express";
import db from "./config/database.js";
import amountRoutes from "./routes/Amountindex.js";
import cryptoRoutes from "./routes/Cryptoindex.js";
import userRoutes from "./routes/Userindex.js";
import portfolioRoutes from "./routes/Portfolioindex.js";
import tradehistoryRoutes from "./routes/TradeHistoryindex.js";

import cors from "cors";
 
const app = express();
 
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}
 
app.use(cors());
app.use(express.json());
app.use('/amounts', amountRoutes);
app.use('/cryptos', cryptoRoutes);
app.use('/users', userRoutes);
app.use('/portfolios', portfolioRoutes);
app.use('/tradehistories', tradehistoryRoutes);
 
app.listen(5000, () => console.log('Server running at port 5000'));