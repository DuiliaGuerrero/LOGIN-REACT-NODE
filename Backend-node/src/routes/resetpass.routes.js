import { Router } from "express";
import {
  ERR_USER_NOT_FOUND,
  forgotPassword, 
  updateUser,
  getUser

} from "../controllers/resetpass.controller.js";

const router = Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    await forgotPassword(email);
    res.status(200).json({ status: "Success" });
  } catch (err) {
    if (err.message === ERR_USER_NOT_FOUND) {
      res.status(404).json({ msg: ERR_USER_NOT_FOUND });
    } else {
      console.error(err);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
});

router.put("/update-user", updateUser);

router.get("/user/:id", getUser);


export default router;