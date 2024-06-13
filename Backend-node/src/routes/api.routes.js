import { Router } from "express";
import loginRoutes from "./login.routes.js";
import resetPass from "./resetpass.routes.js" 
const router = Router();

router.use('', loginRoutes);
router.use('', resetPass);

export default router;