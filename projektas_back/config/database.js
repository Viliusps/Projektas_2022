import { Sequelize } from "sequelize";
 
const db = new Sequelize('inzinerija', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;