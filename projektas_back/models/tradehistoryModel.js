import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const TradeHistory = db.define('trade_histories',{
    fk_Bought_currency:{
        type: DataTypes.DOUBLE
    },
    fk_Bought_with_currency:{
        type: DataTypes.DOUBLE
    },
    Amount:{
        type: DataTypes.DOUBLE
    },
    Date:{
        type: DataTypes.DATE
    },
    Price_of_first:{
        type: DataTypes.DOUBLE
    },
    Price_of_second:{
        type: DataTypes.DOUBLE
    },
    fk_Portfolio:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
 
export default TradeHistory;