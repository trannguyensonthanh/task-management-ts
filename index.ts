import express, {Express, Request, Response} from "express"
import dotenv from "dotenv";
import * as database from "./config/database";
import Task from "./models/task.model";
const app: Express = express();
const port: number | string = process.env.PORT || 3000
dotenv.config();
database.connect();

app.get('/tasks', async (req: Request, res: Response) => {
 const tasks = await Task.find({
  deleted: false
 });
  res.json(tasks);
});

app.get('/tasks/detail/:id', async (req: Request, res: Response) => {
  const id: string = req.params.id;
 const task = await Task.find({
  _id: id,
  deleted: false
 });
  res.json(task);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
