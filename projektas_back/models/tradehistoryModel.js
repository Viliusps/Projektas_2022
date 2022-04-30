import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const TradeHistory = db.define('trade_histories',{
    bought_currency:{
        type: DataTypes.STRING
    },
    bought_with_currency:{
        type: DataTypes.STRING
    },
    amount:{
        type: DataTypes.DOUBLE
    },
    date:{
        type: DataTypes.DATE
    },
    price_of_first:{
        type: DataTypes.DOUBLE
    },
    price_of_second:{
        type: DataTypes.DOUBLE
    },
    fk_portfolio:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
 
export default TradeHistory;