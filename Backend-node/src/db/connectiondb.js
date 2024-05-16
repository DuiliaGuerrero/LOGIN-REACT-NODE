import { Sequelize } from "sequelize";

const db = new Sequelize('login_jwt', 'root', '1234root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectModule: "mysql12"
  });

export default db;