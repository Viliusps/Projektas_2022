import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Amount = db.define('amounts',{
    amount:{
        type: DataTypes.DOUBLE
    },
    fk_crypto:{
        type: DataTypes.DOUBLE
    },
    fk_portfolio:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
 
export default Amount;