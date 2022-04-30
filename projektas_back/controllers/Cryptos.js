import Crypto from "../models/cryptoModel.js";
 
export const getAllCryptos = async (req, res) => {
    try {
        const cryptos = await Crypto.findAll();
        res.json(cryptos);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getCryptoById = async (req, res) => {
    try {
        const crypto = await Crypto.findAll({
            where: {
                Id: req.params.id
            }
        });
        res.json(crypto[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createCrypto = async (req, res) => {
    try {
        await Crypto.create(req.body);
        res.json({
            "message": "Crypto Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateCrypto = async (req, res) => {
    try {
        await Crypto.update(req.body, {
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "Crypto Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteCrypto = async (req, res) => {
    try {
        await Crypto.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "Crypto Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}