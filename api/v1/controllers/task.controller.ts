import Task from "../models/task.model";
import { Request, Response} from "express"

export const index =  async (req: Request, res: Response) => {
  const status: string = req.query.status.toString()
  interface find {
    deleted: boolean,
    status?: string
  }
const find: find = {
  deleted: false
}
if(status){
  find.status = status
}
  const tasks = await Task.find(find);
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