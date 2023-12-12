import { Router } from "express";
import { DirectorController } from "../controllers/director-controller";

const router = Router();

router.get("/getAll", DirectorController.getAll);
router.post("/add", DirectorController.add);
router.get("/getById/:id", DirectorController.getById);

export default router;
