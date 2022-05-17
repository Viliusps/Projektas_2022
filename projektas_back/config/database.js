import { Sequelize } from "sequelize";
 
const db = new Sequelize('inzinerija2', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;