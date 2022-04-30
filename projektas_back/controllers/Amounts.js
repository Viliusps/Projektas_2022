import Amount from "../models/amountModel.js";
 
export const getAllAmounts = async (req, res) => {
    try {
        const amounts = await Amount.findAll();
        res.json(amounts);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getAmountById = async (req, res) => {
    try {
        const amount = await Amount.findAll({
            where: {
                Id: req.params.id
            }
        });
        res.json(amount[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createAmount = async (req, res) => {
    try {
        await Amount.create(req.body);
        res.json({
            "message": "Amount Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateAmount = async (req, res) => {
    try {
        await Amount.update(req.body, {
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "Amount Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteAmount = async (req, res) => {
    try {
        await Amount.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "Amount Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}