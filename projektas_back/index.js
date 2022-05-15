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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:5000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.get('/', function(req, res, next) {
    // Handle the get for this route
  });
  
  app.post('/', function(req, res, next) {
   // Handle the post for this route
  });
 
app.listen(5000, () => console.log('Server running at port 5000'));