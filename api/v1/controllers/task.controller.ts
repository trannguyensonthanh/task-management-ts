import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";
import Task from "../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  //find
  interface find {
    deleted: boolean;
    status?: string;
    title? :string | RegExp;
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
    currentPage: 1,
  };
  const countTasks = await Task.countDocuments(find); // sử dụng countDoc.. để đếm só lượng những sản phẩm được phép hiển thị
  let objectPagination = paginationHelper(initPagination, req, countTasks);
  const objectSearch = searchHelper(req);
 // đoạn tìm kiếm
 if (req.query.keyword) {
  find.title = objectSearch.title;
}
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

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const status: string = req.body.status;
    await Task.updateOne({
      _id: id
    }, {
      status: status
    })

   res.json({
    code: 200,
    message: "Cập nhật trạng thái thành công"
   })
  } catch (error){
  res.json({
    code: 400,
    message: "Lỗi"
  })
  }

};

export const changeMulti = async (req: Request, res: Response) => {
  try {
    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;
    switch(key){
       case "status":
    await Task.updateMany({
      _id: {$in: ids}
    }, {
      status: value
    })
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công"
     })
     break;
     
     default:
      res.json({
        code: 400,
        message: "Cập nhật trạng thái thất bại"
       })
    }
     

  
  } catch (error){
  res.json({
    code: 400,
    message: "Lỗi"
  })
  }

};
