import { DataTypes } from "sequelize";
import dbConnection from "../db/connectiondb.js";

const User = dbConnection.define('User',{
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    blocked:{
        type: DataTypes.BOOLEAN
    },
    failedLogins:{
        type: DataTypes.NUMBER
    },
    lastFailedLogin:{
        type: DataTypes.DATE
    }

}, { timestamps: false })

export default User;