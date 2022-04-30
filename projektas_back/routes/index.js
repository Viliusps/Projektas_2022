import express from "express";
 
import { 
    getAllAmounts,
    createAmount,
    getAmountById,
    updateAmount,
    deleteAmount
} from "../controllers/Amounts.js";

import { 
    getAllCryptos,
    createCrypto,
    getCryptoById,
    updateCrypto,
    deleteCrypto
} from "../controllers/Cryptos.js";

import { 
    getAllPortfolios,
    createPortfolio,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
} from "../controllers/Portfolios.js";

import { 
    getAllTradeHistories,
    createTradeHistory,
    getTradeHistoryById,
    updateTradeHistory,
    deleteTradeHistory
} from "../controllers/TradeHistories.js";

import { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/Users.js";

 
const router = express.Router();
 /*
router.get('/', getAllAmounts);
router.get('/:id', getAmountById);
router.post('/', createAmount);
router.patch('/:id', updateAmount);
router.delete('/:id', deleteAmount);
*/
router.get('/', getAllCryptos);
router.get('/:id', getCryptoById);
router.post('/', createCrypto);
router.patch('/:id', updateCrypto);
router.delete('/:id', deleteCrypto);
/*
router.get('/', getAllPortfolios);
router.get('/:id', getPortfolioById);
router.post('/', createPortfolio);
router.patch('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

router.get('/', getAllTradeHistories);
router.get('/:id', getTradeHistoryById);
router.post('/', createTradeHistory);
router.patch('/:id', updateTradeHistory);
router.delete('/:id', deleteTradeHistory);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
*/
export default router;