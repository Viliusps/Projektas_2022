import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Amount = db.define('amounts',{
    amount:{
        type: DataTypes.FLOAT
    },
    staking_amount:{
        type: DataTypes.DOUBLE
    },
    when_staked:{
        type: DataTypes.DATE
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