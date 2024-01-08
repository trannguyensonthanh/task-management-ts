import { taskRoutes } from "./task.route"
import {Express} from "express"
import { userRoutes } from "./user.route";

const routeApiVer1 = (app: Express): void => {
  const version = "/api/v1";
  app.use(version + '/tasks', taskRoutes);
  app.use(version + '/users', userRoutes);
};



export default routeApiVer1;