import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Crypto = db.define('cryptos',{
    name:{
        type: DataTypes.STRING
    },
    staking_percentage:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
 
export default Crypto;