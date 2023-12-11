import { Router } from "express";
import { DirectorController } from "../controllers/director-controller";

const router = Router();

router.get("/getAll", DirectorController.getAllDirectors);
router.post("/add", DirectorController.addDirectorHandler);
router.get("/getById/:id", DirectorController.getById);

export default router;
