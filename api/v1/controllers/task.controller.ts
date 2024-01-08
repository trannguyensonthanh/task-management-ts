import Task from "../models/task.model";
import { Request, Response} from "express"

export const index =  async (req: Request, res: Response) => {
  //find
  interface find {
    deleted: boolean,
    status?: string
  }
const find: find = {
  deleted: false
}
if(req.query.status){
  find.status = req.query.status.toString()
}
// end find

//sort
const sort = {}
if(req.query.sortKey && req.query.sortValue){
  const sortKey = req.query.sortKey.toLocaleString();
  sort[sortKey] = req.query.sortValue
}
  const tasks = await Task.find(find).sort(sort);
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