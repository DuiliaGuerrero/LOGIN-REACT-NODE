import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { differenceInHours, differenceInMinutes } from 'date-fns';


export const ERR_USER_NOT_FOUND = "usuario no encontrado"
export const ERR_PASSWORD_NOT_VALID = "contrasena no valida"
export const ERR_EMAIL_ALREADY_EXISTS = "el correo electronico ya esta registrado";
export const ERR_USER_BLOCKED = "el usuario se encuentra bloqueado";

export const login = async(email, password) => {
    const user = await User.findOne({
        where: {email}
    })

    if (!user) {
        throw new Error(ERR_USER_NOT_FOUND)
    }

    const validPassword = await bcrypt.compareSync(
        password, 
        user.dataValues.password,
    )

    if (!validPassword) {
        throw new Error(ERR_PASSWORD_NOT_VALID)
    }

    const payload = {
        email: user.dataValues.email,
        id: user.dataValues.id
    }

    return jwt.sign(payload, "auth_key_custom_secret")
}

export const createUser = async (email, password) => {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
        throw new Error(ERR_EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ email, password: hashedPassword })

    return newUser;
};

export const checkIfBlocked = async (email) => {
    const user = await User.findOne({ where: { email } })

    if (!user) {
        throw new Error(ERR_USER_NOT_FOUND)
    }

    if (user.blocked) {
        const currentTime = new Date();
        const blockedTime = new Date(user.lastFailedLogin);
        const hoursDifference = differenceInMinutes(currentTime, blockedTime);

        console.log(hoursDifference)


        if (hoursDifference > 0) {
            await User.update({ blocked: false, blockedAt: null, failedLogins: 0 }, { where: { email } });
            return false; // Usuario desbloqueado
        } else {
            throw new Error(ERR_USER_BLOCKED);
        }
    }

    return true; // Usuario no está bloqueado
};

export const addFailedLoginAttempt = async (email) => {
    const user = await User.findOne({ where: { email } })

    let failedLogins = user.failedLogins || 0;
    failedLogins++;

    const currentDate = new Date().toISOString();

    if (failedLogins >= 3) {
        await User.update({ blocked: true, lastFailedLogin: currentDate }, { where: { email } });
    } else {
        await User.update({ failedLogins, lastFailedLogin: currentDate }, { where: { email } });
    }
};
