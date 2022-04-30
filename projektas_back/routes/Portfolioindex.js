import express from "express";
 
import { 
    getAllPortfolios,
    createPortfolio,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
} from "../controllers/Portfolios.js";
 
const router = express.Router();

router.get('/', getAllPortfolios);
router.get('/:id', getPortfolioById);
router.post('/', createPortfolio);
router.patch('/:id', updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;