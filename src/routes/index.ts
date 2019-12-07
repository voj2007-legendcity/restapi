import { Router } from "express";
// routers
import task from "./task";

const router: Router = Router();
router.use('/task', task);

export default router;