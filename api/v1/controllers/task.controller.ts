import Task from "../models/task.model";
import { Request, Response} from "express"

export const index =  async (req: Request, res: Response) => {
  const tasks = await Task.find({
   deleted: false
  });
   res.json(tasks);
 }
 

export const taskDetail =  async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const tasks = await Task.find({
    _id: id,
   deleted: false
  });
   res.json(tasks);
 }