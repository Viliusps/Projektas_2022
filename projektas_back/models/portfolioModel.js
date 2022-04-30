import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Portfolio = db.define('portfolios',{
    name:{
        type: DataTypes.STRING
    },
    fk_user:{
        type: DataTypes.DOUBLE
    }
},{
    freezeTableName: true
});
 
export default Portfolio;