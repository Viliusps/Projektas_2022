import express from "express";
 
import { 
    getAllTradeHistories,
    createTradeHistory,
    getTradeHistoryById,
    updateTradeHistory,
    deleteTradeHistory
} from "../controllers/TradeHistories.js";

const router = express.Router();

router.get('/', getAllTradeHistories);
router.get('/:id', getTradeHistoryById);
router.post('/', createTradeHistory);
router.patch('/:id', updateTradeHistory);
router.delete('/:id', deleteTradeHistory);

export default router;