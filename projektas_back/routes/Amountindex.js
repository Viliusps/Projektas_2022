import express from "express";
 
import { 
    getAllAmounts,
    createAmount,
    getAmountById,
    updateAmount,
    deleteAmount
} from "../controllers/Amounts.js";

 
const router = express.Router();

router.get('/', getAllAmounts);
router.get('/:id', getAmountById);
router.post('/', createAmount);
router.patch('/:id', updateAmount);
router.delete('/:id', deleteAmount);

export default router;