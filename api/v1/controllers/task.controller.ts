import paginationHelper from "../../../helpers/pagination";
import Task from "../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  //find
  interface find {
    deleted: boolean;
    status?: string;
  }
  const find: find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status.toString();
  }
  // end find

  // pagination
  let initPagination = {
    limitItems: 3,
    currentPage: 0,
  };
  const countTasks = await Task.countDocuments(find); // sử dụng countDoc.. để đếm só lượng những sản phẩm được phép hiển thị
  let objectPagination = paginationHelper(initPagination, req, countTasks);

  //sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toLocaleString();
    sort[sortKey] = req.query.sortValue;
  }
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
  res.json(tasks);
};

export const taskDetail = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const tasks = await Task.find({
    _id: id,
    deleted: false,
  });
  res.json(tasks);
};
