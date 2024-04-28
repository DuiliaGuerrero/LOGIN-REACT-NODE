import { Sequelize } from "sequelize";

const db = new Sequelize('login_jwt', 'root', '1234root', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default db;