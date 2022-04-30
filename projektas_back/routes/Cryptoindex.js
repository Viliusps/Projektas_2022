import express from "express";

import { 
    getAllCryptos,
    createCrypto,
    getCryptoById,
    updateCrypto,
    deleteCrypto
} from "../controllers/Cryptos.js";
 
const router = express.Router();

router.get('/', getAllCryptos);
router.get('/:id', getCryptoById);
router.post('/', createCrypto);
router.patch('/:id', updateCrypto);
router.delete('/:id', deleteCrypto);

export default router;