import TradeHistory from "../models/tradehistoryModel.js";
 
export const getAllTradeHistories = async (req, res) => {
    try {
        const tradehistories = await TradeHistory.findAll();
        res.json(tradehistories);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getTradeHistoryById = async (req, res) => {
    try {
        const tradehistory = await TradeHistory.findAll({
            where: {
                Id: req.params.id
            }
        });
        res.json(tradehistory[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createTradeHistory = async (req, res) => {
    try {
        await TradeHistory.create(req.body);
        res.json({
            "message": "TradeHistory Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateTradeHistory = async (req, res) => {
    try {
        await TradeHistory.update(req.body, {
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "TradeHistory Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteTradeHistory = async (req, res) => {
    try {
        await TradeHistory.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "TradeHistory Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}