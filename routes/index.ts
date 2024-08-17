import express  from "express"
import { UserRegister } from "../controllers/auth/userRegister";
import { UserLogin } from "../controllers/auth/userLogin";

const router = express.Router();

router.post("/register",UserRegister);
router.post("/login",UserLogin);



export default router;