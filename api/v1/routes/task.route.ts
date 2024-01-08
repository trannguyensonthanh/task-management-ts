import {Router, Express, Request, Response} from "express"
const router: Router =  Router();
import * as controller from "../controllers/task.controller";

router.get("/", controller.index);
router.get("/detail/:id", controller.taskDetail);
router.patch("/change-status/:id", controller.changeStatus);


export const taskRoutes: Router = router;