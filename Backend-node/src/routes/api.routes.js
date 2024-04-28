import { Router } from "express";
import loginRoutes from "./login.routes.js";
const router = Router();

router.use('', loginRoutes);

export default router;