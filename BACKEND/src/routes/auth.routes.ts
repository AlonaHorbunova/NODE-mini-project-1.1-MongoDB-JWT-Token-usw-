import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router: Router = Router(); // Можно явно указать тип Router

router.post("/register", register);
router.post("/login", login);

export default router;
