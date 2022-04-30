import Portfolio from "../models/portfolioModel.js";
 
export const getAllPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.findAll();
        res.json(portfolios);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getPortfolioById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findAll({
            where: {
                Id: req.params.id
            }
        });
        res.json(portfolio[0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createPortfolio = async (req, res) => {
    try {
        await Portfolio.create(req.body);
        res.json({
            "message": "Portfolio Created"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updatePortfolio = async (req, res) => {
    try {
        await Portfolio.update(req.body, {
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "Portfolio Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deletePortfolio = async (req, res) => {
    try {
        await Portfolio.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.json({
            "message": "Portfolio Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}