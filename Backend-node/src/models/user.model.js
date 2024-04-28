import { DataTypes } from "sequelize";
import dbConnection from "../db/connectiondb.js";

const User = dbConnection.define('User',{
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
}, { timestamps: false })

export default User;