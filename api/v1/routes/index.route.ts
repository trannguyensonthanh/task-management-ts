import { taskRoutes } from "./task.route"
import {Express} from "express"

const routeApiVer1 = (app: Express): void => {
  const version = "/api/v1";
  app.use(version + '/tasks', taskRoutes);
};



export default routeApiVer1;