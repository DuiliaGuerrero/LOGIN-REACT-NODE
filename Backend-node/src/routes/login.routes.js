import { Router } from "express";
import { 
    ERR_PASSWORD_NOT_VALID, 
    ERR_USER_NOT_FOUND,
    ERR_EMAIL_ALREADY_EXISTS,
    login,
    createUser,
    addFailedLoginAttempt, 
    ERR_USER_BLOCKED,
    checkIfBlocked
 } from "../controllers/login.controller.js";
import verifyToken from "../middleware/login.middleware.js";

const router = Router();

export const ERR_INTERNAL_SERVER = "internal server error"
export const ERR_UNAUTHORIZED = "usuario no autorizado"

router.post('/login', async (req, res) =>{
    const { email, password } = req.body;
    try{
        await checkIfBlocked(email)
        const token = await login(email, password)
        res.status(200).json({ token });
    } catch (err) {
        if (err.message == ERR_PASSWORD_NOT_VALID) {
            addFailedLoginAttempt(email)
            res.status(401).json({ msg: ERR_PASSWORD_NOT_VALID });
        } else if (err.message == ERR_USER_NOT_FOUND) {
            res.status(404).json({msg: ERR_USER_NOT_FOUND})
        } else if(err.message == ERR_USER_BLOCKED){
            res.status(401).json({msg: ERR_USER_BLOCKED})
        }else{
            console.log(err)
            res.status(500).json({msg: ERR_INTERNAL_SERVER})
        }
    }
})

router.post('/create', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await createUser(email, password);
        
        res.status(201).json({ user: newUser });
    } catch (err) {
        if (err.message === ERR_EMAIL_ALREADY_EXISTS) {
            res.status(400).json({ msg: ERR_EMAIL_ALREADY_EXISTS });
        } else {
            console.log(err)
            res.status(500).json({ msg: ERR_INTERNAL_SERVER });
        }
    }
});

router.get("/protected-route", verifyToken, (req, res) => {
    try {
        // Podemos acceder a la información del usuario a través del token
        console.log(req.user)

        res.status(200).json({ msg: "Acceso concedido" });
    } catch(err) {
        if (err.message === ERR_UNAUTHORIZED) {
            res.status(400).json({ msg: ERR_UNAUTHORIZED });
        } else {
            console.log(err)
            res.status(500).json({ msg: ERR_INTERNAL_SERVER });
        }
    }
});

export default router;



