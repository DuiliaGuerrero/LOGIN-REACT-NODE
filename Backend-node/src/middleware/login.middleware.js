import jwt from "jsonwebtoken";
import { ERR_UNAUTHORIZED } from '../routes/login.routes.js' 

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: ERR_UNAUTHORIZED });
  }

  try {
    // Desencriptamos la información del token y la guardamos en
    // req.user
    const decoded = jwt.verify(token, "auth_key_custom_secret");
    req.user = decoded;

    next(); 
  } catch (error) {
    return res.status(401).json({ msg: ERR_UNAUTHORIZED });
  }
};

export default verifyToken;