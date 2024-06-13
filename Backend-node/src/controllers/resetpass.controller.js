import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Import nodemailer

import User from '../models/user.model.js'; 

export const ERR_USER_NOT_FOUND = "usuario no encontrado";

export const forgotPassword = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error(ERR_USER_NOT_FOUND);
    }

    const token = jwt.sign({ id: user.id }, "auth_key_custom_secret", { expiresIn: "1d" });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'duilia.guerrerov@gmail.com',
            pass: 'heitzpueiqzgzvln'
        }
    });

    var mailOptions = {
        from: 'duilia.guerrerov@gmail.com',
        to: email,
        subject: 'Reset your password',
        text: `http://localhost:5173/update-user/${user.id}` 
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new Error(error); // Throw error to be caught in the route
        }
    });

    return token;
};


export const updateUser = async (req, res) => {
    try {
        const { id, password } = req.body;

        if (!id || !password) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userFront = await User.findOne({ where: { id } });
        if (!userFront) {
            return res.status(404).json({ msg: `El usuario con el id: ${id} no existe` });
        }

        await User.update(
            { password: hashedPassword, confirm_password: password },
            { where: { id } }
        );

        res.status(200).json({
            msg: `El usuario con el id: ${id} ha sido actualizado correctamente`,
            user: {
                id: userFront.id,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ msg: `El usuario con el id: ${id} no existe` });
        }

        res.status(200).json({
            user: {
                id: user.id,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};
