import { Router } from "express";
import { RegisterController } from "../controllers/register-controller";

const router = Router();

router.post("/", RegisterController.registerUserHandler);

export default router;
