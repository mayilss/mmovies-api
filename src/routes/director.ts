import { Router } from "express";
import DirectorController from "../controllers/director-controller";

const router = Router();

router.get("/getList", DirectorController.getList);
router.post("/add", DirectorController.add);
router.get("/getById", DirectorController.getById);
router.delete("/remove", DirectorController.remove);
router.put("/update", DirectorController.update);

export default router;
