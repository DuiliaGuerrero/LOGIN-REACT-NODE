import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const ERR_USER_NOT_FOUND = "usuario no encontrado"
export const ERR_PASSWORD_NOT_VALID = "contrasena no valida"
export const ERR_EMAIL_ALREADY_EXISTS = "el correo electronico ya esta registrado";

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